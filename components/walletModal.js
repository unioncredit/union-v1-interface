import {
  useWalletModalOpen,
  useWalletModalToggle,
} from "@contexts/Application";
import useEagerConnect from "@hooks/useEagerConnect";
import { CONNECTORS, SUPPORTED_WALLETS } from "@lib/connectors";
import getErrorMessage from "@lib/getErrorMessage";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import Button from "./button";
import Modal from "./modal";

const isMetaMask =
  typeof window !== "undefined" &&
  !!(window.ethereum && window.ethereum.isMetaMask)
    ? true
    : false;

const WalletModal = () => {
  const {
    activate,
    connector,
    active,
    account,
    library,
    deactivate,
    error,
  } = useWeb3React();

  const open = useWalletModalOpen();
  const toggle = useWalletModalToggle();

  const [activatingConnector, setActivatingConnector] = useState();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  useEffect(() => {
    if (!!error) {
      window.alert(getErrorMessage(error));
      setActivatingConnector(undefined);
      // if (connector === walletconnect) connector.close();
      deactivate();
    }
  }, [error]);

  const triedEager = useEagerConnect();

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-10">
          <p className="text-center text-xl mb-3">Sign in</p>
          <div className="w-full h-1 bg-pink-pure" />
          {/* <p className="text-center leading-tight mt-6">
            As a final step your wallet will ask you to authorize Union to
            access your account.
          </p> */}
        </div>

        <div className="mb-10">
          {Object.keys(CONNECTORS).map((name) => {
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
                  {activating
                    ? "Waiting for confirmation..."
                    : name === "Injected" && isMetaMask
                    ? SUPPORTED_WALLETS.MetaMask.name
                    : SUPPORTED_WALLETS[name].name}
                </Button>
              </div>
            );
          })}
        </div>

        {!!error && (
          <p className="text-sm text-center text-red-500 mb-10">
            {getErrorMessage(error)}
          </p>
        )}

        <div className="divider" />

        <p className="text-sm text-center mt-6">
          Don't have an account?{" "}
          <button className="underline font-medium">Sign up</button>
        </p>
      </div>
    </Modal>
  );
};

export default WalletModal;
