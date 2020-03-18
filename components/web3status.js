import useENSName from "@hooks/useENSName";
import { CONNECTORS } from "@lib/connectors";
import truncateAddress from "@util/truncateAddress";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import Button from "./button";
import WalletModal from "./walletModal";
import Web3Button from "./web3Button";

const Identicon = dynamic(() => import("./identicon"));

const Web3Connection = () => {
  const { active, account, connector, error, activate } = useWeb3React();

  const ENSName = useENSName(account);

  const activateInjected = () => activate(CONNECTORS.INJECTED);

  if (account)
    return (
      <Web3Button>
        <div className="ml-1 flex items-center">
          <Identicon />
          <div className="ml-3">{ENSName ?? truncateAddress(account)}</div>
        </div>
      </Web3Button>
    );

  if (error)
    return (
      <Web3Button error>
        {error instanceof UnsupportedChainIdError ? "Wrong Network" : "Error"}
      </Web3Button>
    );

  return <Button onClick={activateInjected}>Start now</Button>;
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
