import useSWR from "swr";
import { RPC_URLS } from "lib/connectors";
import { JsonRpcProvider } from "@ethersproject/providers";
import ENS, { getEnsAddress } from "@ensdomains/ensjs";

const ensProvider = new JsonRpcProvider(RPC_URLS["1"]);
const ens = new ENS({
  provider: ensProvider,
  ensAddress: getEnsAddress("1"),
});

const getENSImage = async (_, ensName) => {
  const image = await ens.name(ensName).getText("avatar");
  return image;
};

/**
 * @name useENSImage
 * @returns {String}
 */
export default function useENSImage(ens) {
  const shouldFetch = typeof ens === "string" && ens.endsWith(".eth");

  const { data } = useSWR(shouldFetch ? ["ENSName", ens] : null, getENSImage);

  return data;
}
