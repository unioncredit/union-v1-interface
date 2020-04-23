import {
  useWalletModalOpen,
  useWalletModalToggle,
} from "@contexts/Application";
import { CONNECTORS, SUPPORTED_WALLETS, walletconnect } from "@lib/connectors";
import getErrorMessage from "@lib/getErrorMessage";
import { useWeb3React } from "@web3-react/core";
import { useAutoEffect } from "hooks.macro";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import Button from "./button";
import Modal from "./modal";
import Spinner from "./spinner";

const isMetaMask =
  typeof window !== "undefined" &&
  !!(window.ethereum && window.ethereum.isMetaMask)
    ? true
    : false;

const getWalletIcon = (name) =>
  name === "Injected" && isMetaMask
    ? SUPPORTED_WALLETS.MetaMask.icon
    : SUPPORTED_WALLETS[name].icon;

const getWalletName = (name) =>
  name === "Injected" && isMetaMask
    ? SUPPORTED_WALLETS.MetaMask.name
    : SUPPORTED_WALLETS[name].name;

const WalletOption = ({ name, activating, disabled, onClick }) => (
  <div className="mt-4" key={name}>
    <Button
      full
      icon={activating ? <Spinner /> : getWalletIcon(name)}
      invert
      onClick={onClick}
      disabled={disabled}
    >
      {activating ? "Waiting for confirmation..." : getWalletName(name)}
    </Button>
  </div>
);

const WALLET_VIEWS = {
  SIGN_IN: "SIGN_IN",
  CREATE: "CREATE",
};

const WalletModal = () => {
  const {
    error,
    active,
    account,
    activate,
    connector,
    deactivate,
  } = useWeb3React();

  const [walletView, setWalletView] = useState(WALLET_VIEWS.CREATE);

  const router = useRouter();

  const open = useWalletModalOpen();
  const toggle = useWalletModalToggle();

  const [activatingConnector, setActivatingConnector] = useState();

  useAutoEffect(() => {
    if (open) setWalletView(WALLET_VIEWS.CREATE);
    if (open && active && account) setWalletView(WALLET_VIEWS.SIGN_IN);
  });

  useAutoEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  });

  useAutoEffect(() => {
    if (!!error) {
      window.alert(getErrorMessage(error));
      setActivatingConnector(undefined);
      if (connector === walletconnect) connector.close();
      deactivate();
    }
  });

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        {walletView === WALLET_VIEWS.SIGN_IN ? (
          <Fragment>
            <div className="mb-10">
              <p className="text-center text-xl mb-3">
                {active ? "Change wallet" : "Sign in"}
              </p>
              <div className="w-full h-1 bg-pink-pure" />
            </div>

            <div className="mb-6">
              {Object.keys(CONNECTORS).map((name, i) => {
                const currentConnector = CONNECTORS[name];
                const activating = currentConnector === activatingConnector;
                const connected = currentConnector === connector;
                const disabled = !!activatingConnector || connected || !!error;

                return (
                  <WalletOption
                    key={i}
                    name={name}
                    onClick={async () => {
                      setActivatingConnector(currentConnector);
                      await activate(CONNECTORS[name]);
                      await toggle();
                      router.push("/stake");
                    }}
                    disabled={disabled}
                    activating={activating}
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

            {active ? (
              <div className="mt-6">
                <Button
                  full
                  className="mb-2"
                  onClick={() => {
                    toggle();
                    router.push("/account");
                  }}
                >
                  My account
                </Button>

                <Button
                  full
                  invert
                  className="mb-2"
                  onClick={() => {
                    if (connector === walletconnect) connector.close();
                    deactivate();
                  }}
                >
                  Sign out
                </Button>

                <button
                  className="text-center w-full focus:outline-none underline font-medium text-sm py-2"
                  onClick={() => {
                    toggle();
                    router.push("/faucet");
                  }}
                >
                  DAI Faucet
                </button>
              </div>
            ) : (
              <Fragment>
                <p className="text-sm text-center mt-6 mb-4">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setWalletView(WALLET_VIEWS.CREATE)}
                    className="underline font-medium"
                  >
                    Sign up
                  </button>
                </p>
                <button
                  className="text-center mx-auto block focus:outline-none underline font-medium text-sm"
                  onClick={toggle}
                >
                  Close
                </button>
              </Fragment>
            )}
          </Fragment>
        ) : (
          <Fragment>
            <div className="mb-10">
              <p className="text-center text-xl mb-3">Create an account</p>
              <div className="w-full h-1 bg-pink-pure" />
            </div>

            <div className="mb-6">
              {Object.keys(CONNECTORS).map((name, i) => {
                const currentConnector = CONNECTORS[name];
                const activating = currentConnector === activatingConnector;
                const connected = currentConnector === connector;
                const disabled = !!activatingConnector || connected || !!error;

                return (
                  <WalletOption
                    key={i}
                    name={name}
                    onClick={async () => {
                      setActivatingConnector(currentConnector);
                      await activate(CONNECTORS[name]);
                      await toggle();
                      router.push("/stake");
                    }}
                    disabled={disabled}
                    activating={activating}
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

            <p className="text-sm text-center mt-6 mb-4">
              Already have an account?{" "}
              <button
                onClick={() => setWalletView(WALLET_VIEWS.SIGN_IN)}
                className="underline font-medium"
              >
                Sign in
              </button>
            </p>

            <button
              className="text-center mx-auto block focus:outline-none underline font-medium text-sm"
              onClick={toggle}
            >
              Close
            </button>
          </Fragment>
        )}
      </div>
    </Modal>
  );
};

export default WalletModal;
