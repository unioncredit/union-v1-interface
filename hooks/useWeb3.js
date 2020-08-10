import { Web3Provider } from "@ethersproject/providers";
import { useCallback, useMemo } from "react";
import { newRidgeState } from "react-ridge-state";

const accountState = newRidgeState(null);
const providerState = newRidgeState(null);
const chainIdState = newRidgeState(null);
const errorState = newRidgeState(null);

const __DEV__ = process.env.NODE_ENV === "development";

function getLibrary(provider) {
  const web3 = new Web3Provider(provider);

  web3.pollingInterval = 12000;

  return web3;
}

export default function useWeb3() {
  const [error, errorSet] = errorState.use();
  const [account, accountSet] = accountState.use();
  const [chainId, chainIdSet] = chainIdState.use();
  const [provider, providerSet] = providerState.use();

  const active =
    provider !== undefined &&
    chainId !== undefined &&
    account !== undefined &&
    !error;

  const library = useMemo(
    () =>
      active && chainId !== undefined && Number.isInteger(chainId) && !!provider
        ? getLibrary(provider)
        : undefined,
    [active, getLibrary, provider, chainId]
  );

  const connect = useCallback(async () => {
    const { default: WalletConnectProvider } = await import(
      "@walletconnect/web3-provider"
    );

    const web3Provider = new WalletConnectProvider({
      infuraId: process.env.NEXT_PUBLIC_INFURA_KEY,
      pollingInterval: 12000,
      qrcodeModalOptions: {
        mobileLinks: ["rainbow", "argent", "trust"],
      },
    });

    web3Provider.on("accountsChanged", handleAccountsChanged);
    web3Provider.on("chainChanged", handleChainChanged);
    web3Provider.on("disconnect", handleDisconnect);

    try {
      await web3Provider.enable();

      providerSet(web3Provider);
      accountSet(web3Provider.accounts[0]);
      chainIdSet(web3Provider.chainId);
    } catch (err) {
      if (err.message === "User closed modal") {
        errorState.reset();
      } else {
        errorSet(err);
      }
    }
  }, []);

  const disconnect = useCallback(() => {
    provider.disconnect();
    provider.removeListener("accountsChanged", handleAccountsChanged);
    provider.removeListener("chainChanged", handleChainChanged);
    provider.removeListener("disconnect", handleDisconnect);

    reset();
  }, []);

  const reset = () => {
    errorState.reset();
    accountState.reset();
    chainIdState.reset();
    providerState.reset();
  };

  const handleAccountsChanged = (handledAccounts) => {
    if (__DEV__) {
      console.warn(
        "Handling 'accountsChanged' event with payload",
        handledAccounts
      );
    }
  };

  const handleChainChanged = (handledChainId) => {
    if (__DEV__) {
      console.warn(
        "Handling 'chainChanged' event with payload",
        handledChainId
      );
    }
  };

  const handleDisconnect = (code, reason) => {
    if (__DEV__) {
      console.warn("Handling 'disconnect' event", code, reason);
    }
  };

  return {
    /**
     * @type {Boolean}
     */
    active,
    /**
     * @type {import("@ethersproject/providers").Web3Provider}
     */
    library,
    /**
     * @type {String}
     */
    account,
    /**
     * @type {Number}
     */
    chainId,
    /**
     * @type {Error}
     */
    error,
    connect,
    disconnect,
  };
}
