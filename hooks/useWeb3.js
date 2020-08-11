import { Web3Provider } from "@ethersproject/providers";
import { useCallback, useMemo } from "react";
import useSWR from "swr";

const __DEV__ = process.env.NODE_ENV === "development";

const useSharedState = (key, initial) => {
  const { data: state, mutate: setState } = useSWR(key, {
    initialData: initial,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  return [state, setState];
};

function getLibrary(provider) {
  return new Web3Provider(provider);
}

export default function useWeb3() {
  const [account, accountSet] = useSharedState("Web3Account", null);
  const [chainId, chainIdSet] = useSharedState("Web3ChainId", null);
  const [error, errorSet] = useSharedState("Web3Error", null);
  const [provider, providerSet] = useSharedState("Web3Provider", null);

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

    try {
      await web3Provider.enable();

      await accountSet(web3Provider.accounts[0]);

      await chainIdSet(web3Provider.chainId);

      await providerSet(web3Provider);
    } catch (err) {
      if (err.message === "User closed modal") {
        await errorSet(null);
      } else {
        await errorSet(err);
      }
    }
  }, []);

  const disconnect = useCallback(async () => {
    if (provider) {
      provider.disconnect();
      provider.removeListener("accountsChanged", handleAccountsChanged);
      provider.removeListener("chainChanged", handleChainChanged);
    }

    await providerSet(null);
    await errorSet(null);
    await accountSet(null);
    await chainIdSet(null);
  }, []);

  const handleAccountsChanged = async (handledAccounts) => {
    if (__DEV__) {
      console.warn(
        "Handling 'accountsChanged' event with payload",
        handledAccounts
      );
    }

    await accountSet(handledAccounts[0]);
  };

  const handleChainChanged = async (handledChainId) => {
    if (__DEV__) {
      console.warn(
        "Handling 'chainChanged' event with payload",
        handledChainId
      );
    }

    await chainIdSet(handledChainId);
  };

  const active =
    provider !== undefined &&
    chainId !== undefined &&
    account !== undefined &&
    !error;

  /**
   * @type {import("@ethersproject/providers").Web3Provider}
   */
  const library = useMemo(
    () =>
      active && chainId !== undefined && Number.isInteger(chainId) && !!provider
        ? getLibrary(provider)
        : undefined,
    [active, getLibrary, provider, chainId]
  );

  return {
    active,
    error,

    library,
    account,
    chainId,

    connect,
    disconnect,
  };
}
