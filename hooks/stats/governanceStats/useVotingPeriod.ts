import { Contract } from "@ethersproject/contracts";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import useSWR from "swr";

const getVotingPeriod = (governanceContract: Contract) => async () => {
  return governanceContract.votingPeriod();
};

export default function useVotingPeriod() {
  const contract: Contract = useGovernanceContract();

  const shouldFetch: boolean = Boolean(contract);

  return useSWR(
    shouldFetch ? ["votingPeriod"] : null,
    getVotingPeriod(contract)
  );
}
