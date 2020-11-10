import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import useSWR from "swr";

const getProposalMaxOperations = (contract) => async () => {
  const res = await contract.proposalMaxOperations();

  return Number(res);
};

export default function useProposalMaxOperations() {
  const contract = useGovernanceContract();

  const shouldFetch = Boolean(contract);

  return useSWR(
    shouldFetch ? ["ProposalMaxOperations"] : null,
    getProposalMaxOperations(contract)
  );
}
