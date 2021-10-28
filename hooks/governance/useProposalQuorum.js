import { formatUnits } from "@ethersproject/units";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import useReadProvider from "hooks/useReadProvider";
import useSWR from "swr";

const getQuorum = (contract) => async () => {
  const res = await contract.quorumVotes();

  return formatUnits(res, 18);
};

export default function useProposalQuorum() {
  const readProvider = useReadProvider();
  const contract = useGovernanceContract(readProvider);

  const shouldFetch = Boolean(contract);

  return useSWR(shouldFetch ? ["ProposalQuorum"] : null, getQuorum(contract));
}
