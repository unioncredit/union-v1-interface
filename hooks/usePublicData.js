import useENSName from "hooks/useENSName";

function truncate(text) {
  if (text.startsWith("0x")) {
    return `${text.slice(0, 6)}...${text.slice(-6)}`;
  }
  return text;
}

export default function usePublicData(address) {
  const ENSName = useENSName(address);
  const hasENSName = !!ENSName;

  return {
    name: hasENSName ? ENSName : address && truncate(address),
    image: null,
    ENSName,
  };
}
