import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";

const getBox = async (_, account, library) => {
  let box;

  const Box = (await import("3box")).default;

  box = await Box.openBox(account, library);

  await box.syncDone;

  return box;
};

export default function useBox() {
  const { account, library } = useWeb3React();

  const shouldFetch = typeof account === "string" && !!library;

  const { data = null } = useSWR(
    shouldFetch ? ["Box", account, library] : null,
    getBox,
    {
      dedupingInterval: 15 * 1000,
      refreshInterval: 30 * 1000,
      refreshWhenHidden: false,
      revalidateOnFocus: false,
      refreshWhenOffline: false,
      revalidateOnReconnect: false,
    }
  );

  return data;
}
