import { useWeb3React } from "@web3-react/core";
import use3BoxPublicData from "hooks/use3BoxPublicData";
import { useLogout } from "hooks/useEagerConnect";
import useENSName from "hooks/useENSName";
import useToast, { FLAVORS } from "hooks/useToast";
import { walletconnect } from "lib/connectors";
import Link from "next/link";
import { useState } from "react";
import Arrow from "svgs/Arrow";
import truncateAddress from "util/truncateAddress";
import Identicon from "./identicon";
import ProfileImage from "./ProfileImage";
import Web3Button from "./web3Button";

const Web3Connection = () => {
  const { account, connector, deactivate } = useWeb3React();

  const ENSName = useENSName(account);

  const { data, error } = use3BoxPublicData(account);
  const has3BoxProfileImage = !!data && !error && data?.image;

  const logout = useLogout();

  const addToast = useToast();

  const handleSignOut = () => {
    if (connector === walletconnect) connector.close();

    deactivate();
    addToast(FLAVORS.LOGGED_OUT);
    logout();
  };

  const [isOpen, isOpenSet] = useState(false);
  const toggle = () => isOpenSet(!isOpen);

  return (
    <ul className="flex items-center">
      <li className="ml-6 md:ml-8">
        <div className="relative">
          <Web3Button
            onClick={toggle}
            id="options-menu"
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            <div className="flex items-center">
              {has3BoxProfileImage ? (
                <ProfileImage
                  alt={ENSName ?? account}
                  image={data.image}
                  size={18}
                />
              ) : (
                <Identicon address={account} />
              )}

              <div className="ml-3 mr-2">
                {ENSName ?? truncateAddress(account)}
              </div>

              <Arrow />
            </div>
          </Web3Button>

          {isOpen && (
            <div className="origin-top-right absolute right-0 -mr-1 mt-2 w-56 z-50">
              <div className="rounded border bg-white">
                <div
                  className="p-2 space-y-2"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <Link href="/account">
                    <a
                      className="block px-3 rounded-sm py-2 leading-5 font-medium hover:bg-border-light transition-colors duration-150 focus:outline-none focus:shadow-outline"
                      role="menuitem"
                    >
                      My account
                    </a>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    type="button"
                    className="block w-full text-left px-3 rounded-sm py-2 font-medium leading-5 hover:bg-border-light transition-colors duration-150 focus:outline-none focus:shadow-outline"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </li>
    </ul>
  );
};

export default Web3Connection;
