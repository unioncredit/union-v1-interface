import { useWeb3React } from "@web3-react/core";
import { useAutoEffect } from "hooks.macro";
import useEagerConnect, { useLogin, useLogout } from "hooks/useEagerConnect";
import useIsSanctioned from "hooks/useIsSanctioned";
import useToast, { FLAVORS } from "hooks/useToast";
import { CONNECTORS, SUPPORTED_WALLETS, walletconnect } from "lib/connectors";
import getErrorMessage from "lib/getErrorMessage";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import Button from "../button";
import Modal from "../modal";
import {
  useUpdateWalletModalView,
  useWalletModalOpen,
  useWalletModalToggle,
  useWalletModalView,
} from "./state";

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
      icon={getWalletIcon(name)}
      invert
      onClick={onClick}
      disabled={disabled}
      submitting={activating}
    >
      {getWalletName(name)}
    </Button>
  </div>
);

const WalletModal = () => {
  const isSanctioned = useIsSanctioned();

  const { error, active, activate, connector, deactivate } = useWeb3React();

  const walletView = useWalletModalView();

  const {
    setWalletViewCreate,
    setWalletViewSignIn,
  } = useUpdateWalletModalView();

  const router = useRouter();

  const open = useWalletModalOpen();
  const toggle = useWalletModalToggle();

  const addToast = useToast();

  const [activatingConnector, setActivatingConnector] = useState();

  useAutoEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  });

  /**
   * Handle disconnecting from the wallet if an error occurs
   */
  useAutoEffect(() => {
    if (!!error) {
      window.alert(getErrorMessage(error));
      setActivatingConnector(undefined);
      if (connector === walletconnect) connector.close();
      deactivate();
    }
  });

  const triedEager = useEagerConnect();

  const logout = useLogout();

  const login = useLogin();

  const handleSignOut = () => {
    if (connector === walletconnect) connector.close();

    deactivate();

    addToast(FLAVORS.LOGGED_OUT);

    logout();

    toggle();
  };

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        {walletView === "SIGN_IN" ? (
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
                const disabled =
                  !triedEager ||
                  !!activatingConnector ||
                  connected ||
                  !!error ||
                  isSanctioned;

                return (
                  <WalletOption
                    key={i}
                    name={name}
                    onClick={async () => {
                      setActivatingConnector(currentConnector);
                      await activate(CONNECTORS[name]);
                      toggle();
                      login();
                      if (router.pathname === "/") router.push("/stake");
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
                  autoFocus
                  className="mb-2"
                  onClick={() => {
                    toggle();
                    router.push("/account");
                  }}
                >
                  My account
                </Button>

                <Button full invert onClick={handleSignOut}>
                  Sign out
                </Button>
              </div>
            ) : (
              <Fragment>
                <p className="text-sm text-center mt-6">
                  Don't have an account?{" "}
                  <button
                    onClick={setWalletViewCreate}
                    className="underline font-medium"
                  >
                    Sign up
                  </button>
                </p>
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
                const disabled =
                  !!activatingConnector || connected || !!error || isSanctioned;

                return (
                  <WalletOption
                    key={i}
                    name={name}
                    onClick={async () => {
                      setActivatingConnector(currentConnector);
                      await activate(CONNECTORS[name]);
                      toggle();
                      login();
                      if (router.pathname === "/") router.push("/stake");
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

            <p className="text-sm text-center mt-6">
              Already have an account?{" "}
              <button
                onClick={setWalletViewSignIn}
                className="underline focus:outline-none font-medium"
              >
                Sign in
              </button>
            </p>
          </Fragment>
        )}

        <p className="sm:hidden text-sm text-center mt-12">
          <button
            onClick={toggle}
            className="underline focus:outline-none font-medium px-2 py-1"
          >
            Close
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default WalletModal;
