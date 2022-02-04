import { Contract } from "@ethersproject/contracts";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import useReadProvider from "hooks/useReadProvider";
import useSWR from "swr";

const getVotingDelay = async (_, governanceContract: Contract) => {
  return governanceContract.votingDelay();
};

export default function useVotingDelay() {
  const readProvider = useReadProvider();
  const contract: Contract = useGovernanceContract(readProvider);

  const shouldFetch: boolean = Boolean(contract);

  return useSWR(shouldFetch ? ["votingDelay", contract] : null, getVotingDelay);
}
