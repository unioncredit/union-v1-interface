import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";

/**
 * 3Box Box
 */
let box = null;

/**
 * 3Box Space
 */
let space = null;

/**
 * @name openBoxGetSpace
 *
 * @param {String} _
 * @param {String} account
 * @param {import("@ethersproject/providers").Web3Provider} library
 */
const openBoxGetSpace = async (key, account, library) => {
  const provider = library.provider;

  /**
   * Dynamic 3Box Import
   */
  const Box = (await import("3box")).default;

  if (!box) {
    box = await Box.openBox(account, provider);

    await box.syncDone;
  }

  if (!!box && !space) {
    space = await box.openSpace(key);
  }

  return space;
};

export default function useSpace() {
  const { account, library } = useWeb3React();

  const shouldFetch = typeof account === "string" && !!library;

  return useSWR(
    shouldFetch ? ["Union", account, library] : null,
    openBoxGetSpace
  );
}
