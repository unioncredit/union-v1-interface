import useENSName from "@hooks/useENSName";
import truncateAddress from "@util/truncateAddress";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { Fragment } from "react";
import Button from "./button";
import WalletModal from "./walletModal";

const Web3Connection = () => {
  const { active, account, connector, error } = useWeb3React();

  const ENSName = useENSName(account);

  if (account)
    return (
      <Button type="invert">
        <p>{ENSName ?? truncateAddress(account)}</p>
      </Button>
    );

  if (error) {
    <Button type="invert">
      <p>
        {error instanceof UnsupportedChainIdError ? "Wrong Network" : "Error"}
      </p>
    </Button>;
  }

  return (
    <Button type="invert">
      <p>Connect to a wallet</p>
    </Button>
  );
};

const Web3Status = () => {
  return (
    <Fragment>
      <Web3Connection />
      <WalletModal />
    </Fragment>
  );
};

export default Web3Status;
