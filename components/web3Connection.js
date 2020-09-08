import { Menu, MenuButton, MenuItem, MenuList } from "@reach/menu-button";
import { useWeb3React } from "@web3-react/core";
import use3BoxPublicData from "hooks/use3BoxPublicData";
import useCopy from "hooks/useCopy";
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
  const { account, connector, deactivate } = useWeb3React();

  const ENSName = useENSName(account);

  const { data: threeBox, error } = use3BoxPublicData(account);
  const has3BoxProfileImage = !!threeBox && !error && threeBox?.image;

  const { push } = useRouter();
  const handleMyAccount = () => push("/account");

  const logout = useLogout();
  const addToast = useToast();

  const handleSignOut = () => {
    if (connector === walletconnect) connector.close();

    deactivate();
    addToast(FLAVORS.LOGGED_OUT);
    logout();
  };

  const [isCopied, copy] = useCopy();
  const handleCopyAddress = () => copy(account);
  const copyAddressText = isCopied ? "Address copied" : "Copy address";

  return (
    <ul className="flex items-center">
      <li className="ml-6 md:ml-8 relative">
        <Menu>
          <MenuButton>
            <div className="ml-1 flex" aria-hidden>
              {has3BoxProfileImage ? (
                <ProfileImage
                  alt={ENSName ?? account}
                  image={threeBox.image}
                  size={18}
                />
              ) : (
                <Identicon address={account} />
              )}
            </div>
            <div className="ml-3 mr-2">
              {ENSName ?? truncateAddress(account)}
            </div>
            <span className="mr-2px" aria-hidden>
              <Arrow />
            </span>
          </MenuButton>
          <MenuList className="space-y-2">
            <MenuItem onSelect={handleMyAccount}>My account</MenuItem>
            <MenuItem onSelect={handleCopyAddress}>{copyAddressText}</MenuItem>
            <MenuItem onSelect={handleSignOut}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </li>
    </ul>
  );
};

export default Web3Connection;
