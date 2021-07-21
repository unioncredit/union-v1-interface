import { Contract } from "@ethersproject/contracts";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import useSWR from "swr";

const getVotingDelay = (governanceContract: Contract) => async () => {
  return governanceContract.votingDelay();
};

export default function useVotingDelay() {
  const contract: Contract = useGovernanceContract();

  const shouldFetch: boolean = Boolean(contract);

  return useSWR(shouldFetch ? ["votingDelay"] : null, getVotingDelay(contract));
}
