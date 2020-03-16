import useENSName from "@hooks/useENSName";
import truncateAddress from "@util/truncateAddress";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { Fragment } from "react";

const Web3Connection = () => {
  const { active, account, connector, error } = useWeb3React();

  const ENSName = useENSName(account);

  if (account)
    return (
      <button>
        <p>{ENSName ?? truncateAddress(account)}</p>
      </button>
    );

  if (error) {
    <button>
      <p>
        {error instanceof UnsupportedChainIdError ? "Wrong Network" : "Error"}
      </p>
    </button>;
  }

  return (
    <button>
      <p>Connect to a wallet</p>
    </button>
  );
};

const Web3Status = () => {
  return (
    <Fragment>
      <Web3Connection />
    </Fragment>
  );
};

export default Web3Status;
