import useENS from "hooks/useENS";
import truncateAddress from "util/truncateAddress";

export default function usePublicData(address) {
  const ens = useENS(address);
  const ENSName = ens.name;
  const hasENSName = !!ENSName;

  return {
    name: hasENSName ? ENSName : address && truncateAddress(address),
    image: null,
    ENSName,
  };
}
