import useSWR from "swr";
import useENS from "hooks/useENS";

const getENSImage = (ens) => async (_, ensName) => {
  const image = await ens.name(ensName).getText("avatar");
  return image;
};

/**
 * @name useENSImage
 * @returns {String}
 */
export default function useENSImage(ensName) {
  const ens = useENS();

  const shouldFetch =
    ens && typeof ensName === "string" && ensName.endsWith(".eth");

  const { data } = useSWR(
    shouldFetch ? ["ENSName", ensName] : null,
    getENSImage(ens),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return data;
}
