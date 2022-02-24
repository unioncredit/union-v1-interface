import { Contract } from "@ethersproject/contracts";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import useReadProvider from "hooks/useReadProvider";
import useSWR from "swr";

const getVotingPeriod = async (_, governanceContract: Contract) => {
  return governanceContract.votingPeriod();
};

export default function useVotingPeriod() {
  const readProvider = useReadProvider();
  const contract: Contract = useGovernanceContract(readProvider);

  const shouldFetch: boolean = Boolean(contract);

  return useSWR(
    shouldFetch ? ["votingPeriod", contract] : null,
    getVotingPeriod
  );
}
