import {
  useWalletModalOpen,
  useWalletModalToggle
} from "@contexts/Application";
import Modal from "./modal";
import Button from "./button";
import { useWeb3React } from "@web3-react/core";
import { CONNECTORS } from "@lib/connectors";
import useEagerConnect from "@hooks/useEagerConnect";
import { useState, useEffect } from "react";
import getErrorMessage from "@lib/getErrorMessage";

const WalletModal = () => {
  const {
    activate,
    connector,
    active,
    account,
    library,
    deactivate,
    error
  } = useWeb3React();

  const open = useWalletModalOpen();
  const toggle = useWalletModalToggle();

  const [activatingConnector, setActivatingConnector] = useState();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-8">
          <p className="text-center text-xl mb-3">Connect your wallet</p>
          <div className="w-full h-1 bg-primary-500" />
          <p className="text-center leading-tight mt-6">
            As a final step your wallet will ask you to authorize Union to
            access your account.
          </p>
        </div>

        <div className="mt-8 mb-10">
          {Object.keys(CONNECTORS).map(name => {
            const currentConnector = CONNECTORS[name];

            const activating = currentConnector === activatingConnector;
            const connected = currentConnector === connector;
            const disabled =
              !triedEager || !!activatingConnector || connected || !!error;

            return (
              <div className="mt-4" key={name}>
                <Button
                  full
                  invert
                  disabled={disabled}
                  onClick={async () => {
                    setActivatingConnector(currentConnector);
                    await activate(CONNECTORS[name]);
                    toggle();
                  }}
                >
                  {activating ? "Waiting for confirmation..." : name}
                </Button>
              </div>
            );
          })}
        </div>

        {!!error && (
          <p className="text-sm text-center text-red-500 my-4">
            {getErrorMessage(error)}
          </p>
        )}

        <div className="w-full h-px bg-accent" />

        <p className="text-sm text-center mt-6">
          Don't have an account?{" "}
          <button className="underline font-medium">Start now</button>
        </p>
      </div>
    </Modal>
  );
};

export default WalletModal;
