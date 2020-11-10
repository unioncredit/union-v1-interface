import { formatUnits } from "@ethersproject/units";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import useSWR from "swr";

const getProposalThreshold = (contract) => async () => {
  const res = await contract.proposalThreshold();

  return Number(formatUnits(res, 18));
};

export default function useProposalThreshold() {
  const contract = useGovernanceContract();

  const shouldFetch = Boolean(contract);

  return useSWR(
    shouldFetch ? ["ProposalThreshold"] : null,
    getProposalThreshold(contract)
  );
}
