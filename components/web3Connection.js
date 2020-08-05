import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import use3BoxPublicData from "hooks/use3BoxPublicData";
import useENSName from "hooks/useENSName";
import truncateAddress from "util/truncateAddress";
import Identicon from "./identicon";
import ProfileImage from "./ProfileImage";
import { useToggleSignInModal } from "./WalletModal/state";
import Web3Button from "./web3Button";

const Web3Connection = () => {
  const { account, error } = useWeb3React();

  const ENSName = useENSName(account);

  const toggleSignInModal = useToggleSignInModal();

  const { data, error: dataError } = use3BoxPublicData(account);
  const has3BoxProfileImage = !!data && !dataError && data?.image;

  return (
    <ul className="flex items-center">
      <li className="ml-6 md:ml-8">
        <Web3Button onClick={toggleSignInModal} error={Boolean(error)}>
          {Boolean(error) ? (
            error instanceof UnsupportedChainIdError ? (
              "Wrong Network"
            ) : (
              "Error"
            )
          ) : (
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
              <div className="ml-3">{ENSName ?? truncateAddress(account)}</div>
            </div>
          )}
        </Web3Button>
      </li>
    </ul>
  );
};

export default Web3Connection;
