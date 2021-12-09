import useSWR from "swr";
import { RPC_URLS } from "lib/connectors";
import { JsonRpcProvider } from "@ethersproject/providers";
import ENS, { getEnsAddress } from "@ensdomains/ensjs";

function fetchENS() {
  const ensProvider = new JsonRpcProvider(RPC_URLS["1"]);
  const ensObj = new ENS({
    provider: ensProvider,
    ensAddress: getEnsAddress("1"),
  });

  return ensObj;
}

export default function useENS() {
  const resp = useSWR("ENS", fetchENS, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return resp.data;
}
