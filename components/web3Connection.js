import { Menu, MenuButton, MenuItem, MenuList } from "@reach/menu-button";
import { useWeb3React } from "@web3-react/core";
import use3BoxPublicData from "hooks/use3BoxPublicData";
import useCopy from "hooks/useCopy";
import useENSName from "hooks/useENSName";
import useToast, { FLAVORS } from "hooks/useToast";
import { logout } from "lib/auth";
import { walletconnect } from "lib/connectors";
import { useRouter } from "next/router";
import truncateAddress from "util/truncateAddress";
import Identicon from "./identicon";
import ProfileImage from "./ProfileImage";

const NETWORKS = {
  1: { logo: "/images/ethereum-logo.png" },
  3: { logo: "/images/ethereum-logo.png" },
  4: { logo: "/images/ethereum-logo.png" },
  5: { logo: "/images/ethereum-logo.png" },
  42: { logo: "/images/ethereum-logo.png" },
  137: { logo: "/images/polygon-logo.png" },
  80001: { logo: "/images/polygon-logo.png" },
  1336: { logo: "/images/ethereum-logo.png" },
};

const Web3Connection = () => {
  const { account, connector, deactivate, chainId } = useWeb3React();

  const ENSName = useENSName(account);

  const { data: threeBox, error } = use3BoxPublicData(account);
  const has3BoxProfileImage = !!threeBox && !error && threeBox?.image;

  const { push } = useRouter();
  const handleMyAccount = () => push("/account");

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
    <Menu>
      <MenuButton className="btn-menu-button m-3 mr-4">
        <div className="flex" aria-hidden>
          <div className="h-6 w-6 flex bg-white rounded-xl border-solid border">
            <img className="h-4 m-auto" src={NETWORKS[chainId].logo} />
          </div>
        </div>
        <div className="ml-4">
          <span className="hidden sm:inline">
            {ENSName ?? truncateAddress(account)}
          </span>{" "}
          <span className="sm:hidden">
            {ENSName ?? truncateAddress(account, 2)}
          </span>
        </div>
        <div className="ml-3 flex">
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
      </MenuButton>
      <MenuList className="mt-2 w-56 space-y-2 p-2 shadow-input">
        <MenuItem onSelect={handleMyAccount}>My account</MenuItem>
        <MenuItem onSelect={handleCopyAddress}>{copyAddressText}</MenuItem>
        <MenuItem onSelect={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Web3Connection;
