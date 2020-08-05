import { Menu, MenuButton, MenuItem, MenuList } from "@reach/menu-button";
import { useWeb3React } from "@web3-react/core";
import use3BoxPublicData from "hooks/use3BoxPublicData";
import { useLogout } from "hooks/useEagerConnect";
import useENSName from "hooks/useENSName";
import useToast, { FLAVORS } from "hooks/useToast";
import { walletconnect } from "lib/connectors";
import { useRouter } from "next/router";
import Arrow from "svgs/Arrow";
import truncateAddress from "util/truncateAddress";
import Identicon from "./identicon";
import ProfileImage from "./ProfileImage";

const Web3Connection = () => {
  const { push } = useRouter();

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

  const handleMyAccount = () => push("/account");

  return (
    <ul className="flex items-center">
      <li className="ml-6 md:ml-8 relative">
        <Menu>
          <MenuButton>
            <div className="ml-1" aria-hidden>
              {has3BoxProfileImage ? (
                <ProfileImage
                  alt={ENSName ?? account}
                  image={data.image}
                  size={18}
                />
              ) : (
                <Identicon address={account} />
              )}
            </div>
            <div className="ml-3 mr-2">
              {ENSName ?? truncateAddress(account)}
            </div>
            <span aria-hidden>
              <Arrow />
            </span>
          </MenuButton>
          <MenuList className="space-y-2">
            <MenuItem onSelect={handleMyAccount}>My account</MenuItem>
            <MenuItem onSelect={handleSignOut}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </li>
    </ul>
  );
};

export default Web3Connection;
