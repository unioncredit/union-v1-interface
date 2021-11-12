import useENSName from "hooks/useENSName";
import truncateAddress from "util/truncateAddress";

export default function usePublicData(address) {
  const ENSName = useENSName(address);
  const hasENSName = !!ENSName;

  return {
    name: hasENSName ? ENSName : address && truncateAddress(address),
    image: null,
    ENSName,
  };
}
