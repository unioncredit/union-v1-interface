import useENSName from "hooks/useENSName";
import use3BoxPublicData from "hooks/use3BoxPublicData";

function truncate(text) {
  if (text.startsWith("0x")) {
    return `${text.slice(0, 6)}...${text.slice(-6)}`;
  }
  return text;
}

export default function usePublicData(address) {
  const ENSName = useENSName(address);
  const hasENSName = !!ENSName;

  const { data, error } = use3BoxPublicData(address);
  const has3BoxName = !!data && !error && data?.name;

  return {
    name: hasENSName
      ? ENSName
      : has3BoxName
      ? data.name
      : address && truncate(address),
    image: data?.image,
  };
}
