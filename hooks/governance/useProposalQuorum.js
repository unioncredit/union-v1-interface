import { formatUnits } from "@ethersproject/units";
import useGovernanceContract from "hooks/governance/useGovernanceContract";
import useSWR from "swr";

const getQuorum = (contract) => async () => {
  const res = await contract.quorumVotes();

  return formatUnits(res, 18);
};

export default function useProposalQuorum() {
  const contract = useGovernanceContract();

  const shouldFetch = Boolean(contract);

  return useSWR(
    shouldFetch ? ["ProposalQuorum", contract] : null,
    getQuorum(contract)
  );
}
