import useGovernanceContract from "hooks/governance/useGovernanceContract";
import useSWR from "swr";

const getProposalCount = (contract) => async () => {
  const res = await contract.proposalCount();

  return parseInt(res);
};

export default function useProposalCount() {
  const contract = useGovernanceContract();

  const shouldFetch = Boolean(contract);

  return useSWR(
    shouldFetch ? ["ProposalCount", contract] : null,
    getProposalCount(contract)
  );
}
