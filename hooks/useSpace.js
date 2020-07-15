import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";

export default function useSpace() {
  const { account } = useWeb3React();

  return useMemo(async () => {
    /**
     * Dynamic Import
     */
    const Box = (await import("3box")).default;

    const box = await Box.openBox(account, window.ethereum);

    await box.syncDone;

    const space = await box.openSpace("union");

    return space;
  }, [account]);
}
