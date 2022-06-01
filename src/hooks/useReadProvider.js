import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";
import { JsonRpcProvider } from "@ethersproject/providers";
import useChainId from "hooks/useChainId";
import { RPC_URLS } from "lib/connectors";

function fetchProvider(_, chainId, library) {
  if (library && chainId && library.network.chainId === chainId) {
    return library.getSigner().provider;
  }

  return new JsonRpcProvider(RPC_URLS[chainId]);
}

export default function useReadProvider() {
  const { library } = useWeb3React();
  const chainId = useChainId();

  const shouldFetch = !!chainId;

  const resp = useSWR(
    shouldFetch ? ["ReadProvider", chainId, library] : null,
    fetchProvider,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return resp.data;
}
