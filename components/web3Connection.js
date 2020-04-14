import { useWalletModalToggle } from "@contexts/Application";
import useENSName from "@hooks/useENSName";
import truncateAddress from "@util/truncateAddress";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import Button from "./button";
import Identicon from "./identicon";
import Web3Button from "./web3Button";

const Web3Connection = () => {
  const { account, error } = useWeb3React();

  const ENSName = useENSName(account);

  const toggleWalletModal = useWalletModalToggle();

  if (account)
    return (
      <Web3Button onClick={toggleWalletModal}>
        <div className="ml-1 flex items-center">
          <Identicon address={account} />
          <div className="ml-3">{ENSName ?? truncateAddress(account)}</div>
        </div>
      </Web3Button>
    );

  if (error)
    return (
      <Web3Button onClick={toggleWalletModal} error>
        {error instanceof UnsupportedChainIdError ? "Wrong Network" : "Error"}
      </Web3Button>
    );

  return (
    <Button secondary onClick={toggleWalletModal}>
      Start now
    </Button>
  );
};

export default Web3Connection;
