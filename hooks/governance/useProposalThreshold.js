import { formatUnits } from "@ethersproject/units";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import useReadProvider from "hooks/useReadProvider";
import useSWR from "swr";

const getProposalThreshold = async (_, contract) => {
  const res = await contract.proposalThreshold();

  return Number(formatUnits(res, 18));
};

export default function useProposalThreshold() {
  const readProvider = useReadProvider();
  const contract = useGovernanceContract(readProvider);

  const shouldFetch = Boolean(contract);

  return useSWR(
    shouldFetch ? ["ProposalThreshold", contract] : null,
    getProposalThreshold
  );
}
