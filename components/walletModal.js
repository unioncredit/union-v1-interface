import {
  useWalletModalOpen,
  useWalletModalToggle,
  useEmailModalToggle,
} from "@contexts/Application";
import useEagerConnect from "@hooks/useEagerConnect";
import { CONNECTORS, SUPPORTED_WALLETS, walletconnect } from "@lib/connectors";
import getErrorMessage from "@lib/getErrorMessage";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import { useEffect, useState, Fragment } from "react";
import Button from "./button";
import Modal from "./modal";

const isMetaMask =
  typeof window !== "undefined" &&
  !!(window.ethereum && window.ethereum.isMetaMask)
    ? true
    : false;

const WALLET_VIEWS = {
  SIGN_IN: "SIGN_IN",
  CREATE: "CREATE",
};

const WalletOption = ({ name, activating, disabled, onClick }) => {
  const walletIcon =
    name === "Injected" && isMetaMask
      ? SUPPORTED_WALLETS.MetaMask.icon
      : SUPPORTED_WALLETS[name].icon;

  const walletName =
    name === "Injected" && isMetaMask
      ? SUPPORTED_WALLETS.MetaMask.name
      : SUPPORTED_WALLETS[name].name;

  return (
    <div className="mt-4" key={name}>
      <Button
        full
        invert
        disabled={disabled}
        icon={walletIcon}
        onClick={onClick}
      >
        {activating ? "Waiting for confirmation..." : walletName}
      </Button>
    </div>
  );
};

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

  const [walletView, setWalletView] = useState(WALLET_VIEWS.CREATE);

  const router = useRouter();

  const open = useWalletModalOpen();
  const toggle = useWalletModalToggle();

  const toggleEmailModal = useEmailModalToggle();

  const [activatingConnector, setActivatingConnector] = useState();

  useEffect(() => {
    if (open) setWalletView(WALLET_VIEWS.CREATE);
    if (open && active && account) setWalletView(WALLET_VIEWS.SIGN_IN);
  }, [open, active, account]);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  useEffect(() => {
    if (!!error) {
      window.alert(getErrorMessage(error));
      setActivatingConnector(undefined);
      if (connector === walletconnect) connector.close();
      deactivate();
    }
  }, [error]);

  const triedEager = useEagerConnect();

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        {walletView === WALLET_VIEWS.SIGN_IN ? (
          <Fragment>
            <div className="mb-10">
              <p className="text-center text-xl mb-3">Sign in</p>
              <div className="w-full h-1 bg-pink-pure" />
            </div>

            <div className="mb-6">
              {Object.keys(CONNECTORS).map((name) => {
                const currentConnector = CONNECTORS[name];
                const activating = currentConnector === activatingConnector;
                const connected = currentConnector === connector;
                const disabled =
                  !triedEager || !!activatingConnector || connected || !!error;

                return (
                  <WalletOption
                    activating={activating}
                    disabled={disabled}
                    name={name}
                    onClick={async () => {
                      setActivatingConnector(currentConnector);
                      await activate(CONNECTORS[name]);
                      await toggle();
                      router.push("/stake");
                    }}
                  />
                );
              })}
            </div>

            {!!error && (
              <p className="text-sm text-center text-red-500 mb-6">
                {getErrorMessage(error)}
              </p>
            )}

            <div className="divider" />

            <p className="text-sm text-center mt-6">
              Don't have an account?{" "}
              <button
                onClick={() => setWalletView(WALLET_VIEWS.CREATE)}
                className="underline font-medium"
              >
                Sign up
              </button>
            </p>

            {active && (
              <p className="text-sm text-center mt-6">
                <Button
                  full
                  invert
                  onClick={() => {
                    if (connector === walletconnect) connector.close();
                    deactivate();
                  }}
                >
                  Disconnect
                </Button>
              </p>
            )}
          </Fragment>
        ) : (
          <Fragment>
            <div className="mb-10">
              <p className="text-center text-xl mb-3">Create an account</p>
              <div className="w-full h-1 bg-pink-pure" />
            </div>

            <div className="mb-6">
              {Object.keys(CONNECTORS).map((name) => {
                const currentConnector = CONNECTORS[name];
                const activating = currentConnector === activatingConnector;
                const connected = currentConnector === connector;
                const disabled =
                  !triedEager || !!activatingConnector || connected || !!error;

                return (
                  <WalletOption
                    activating={activating}
                    disabled={disabled}
                    name={name}
                    onClick={async () => {
                      setActivatingConnector(currentConnector);
                      await activate(CONNECTORS[name]);
                      await toggle();
                      await toggleEmailModal();
                      // router.push("/stake");
                    }}
                  />
                );
              })}
            </div>

            {!!error && (
              <p className="text-sm text-center text-red-500 mb-6">
                {getErrorMessage(error)}
              </p>
            )}

            <div className="mb-6">
              <p className="text-center leading-tight text-grey-pure font-normal">
                By signing up, you agree to our <br />
                <a className="underline" href="">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a className="underline" href="">
                  Privacy Policy
                </a>
              </p>
            </div>

            <div className="divider" />

            <p className="text-sm text-center mt-6">
              Already have an account?{" "}
              <button
                onClick={() => setWalletView(WALLET_VIEWS.SIGN_IN)}
                className="underline font-medium"
              >
                Sign in
              </button>
            </p>
          </Fragment>
        )}
      </div>
    </Modal>
  );
};

export default WalletModal;
