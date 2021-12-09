import { Contract } from "@ethersproject/contracts";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import useReadProvider from "hooks/useReadProvider";
import useSWR from "swr";

const getVotingPeriod = (governanceContract: Contract) => async () => {
  return governanceContract.votingPeriod();
};

export default function useVotingPeriod() {
  const readProvider = useReadProvider();
  const contract: Contract = useGovernanceContract(readProvider);

  const shouldFetch: boolean = Boolean(contract);

  return useSWR(
    shouldFetch ? ["votingPeriod"] : null,
    getVotingPeriod(contract)
  );
}
