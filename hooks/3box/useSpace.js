import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";

/**
 * @name openBoxGetSpace
 *
 * @param {String} _
 * @param {String} account
 * @param {import("@ethersproject/providers").Web3Provider} library
 */
const openBoxGetSpace = async (key, account, library) => {
  console.log("Ran openBoxGetSpace");

  const provider = library.provider;

  let box;

  const Box = (await import("3box")).default;

  box = await Box.openBox(account, provider);

  await box.syncDone;

  return box.openSpace(key);
};

export default function useSpace() {
  const { account, library } = useWeb3React();

  const shouldFetch = typeof account === "string" && !!library;

  const { data = null } = useSWR(
    shouldFetch ? ["Union", account, library] : null,
    openBoxGetSpace,
    {
      refreshWhenHidden: false,
      revalidateOnFocus: false,
      refreshWhenOffline: false,
      revalidateOnReconnect: false,
    }
  );

  return data;
}
