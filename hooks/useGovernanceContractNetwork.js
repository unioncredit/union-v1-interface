import { Contract } from "@ethersproject/contracts";
import { InfuraProvider } from "@ethersproject/providers";
import { GOV_ABI, GOV_ADDRESS } from "constants/governance";
import { useMemo } from "react";

export function useProvider() {
  return new InfuraProvider("mainnet", process.env.NEXT_PUBLIC_INFURA_KEY);
}

export default function useGovernanceContractNetwork() {
  const provider = useProvider();

  return useMemo(() => new Contract(GOV_ADDRESS, GOV_ABI, provider), []);
}
