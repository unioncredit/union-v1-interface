import useChainId from "hooks/useChainId";

export default function useMaxTrust() {
  const chainId = useChainId();
  return chainId === 42161 ? 50 : 25;
}
