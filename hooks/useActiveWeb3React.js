import { useWeb3React as useWeb3ReactCore } from "@web3-react/core";

export default function useActiveWeb3React() {
  const context = useWeb3ReactCore();
  const contextNetwork = useWeb3ReactCore("INFURA");
  return context.active ? context : contextNetwork;
}
