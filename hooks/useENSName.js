import useSWR from "swr";
import { isAddress } from "@ethersproject/address";
import { JsonRpcProvider } from "@ethersproject/providers";

const getENSName = (_, address) => {
  const library = new JsonRpcProvider(
    "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
  );
  return library.lookupAddress(address);
};

/**
 * @name useENSName
 * @description Gets the ENS name for the active account
 *
 * @returns {String}
 */
export default function useENSName(address) {
  const shouldFetch = isAddress(address);
  const { data } = useSWR(
    shouldFetch ? ["ENSName", address] : null,
    getENSName,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return data;
}
