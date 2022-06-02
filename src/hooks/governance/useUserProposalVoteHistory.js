import useSWR from "swr";
import { formatUnits } from "@ethersproject/units";
import useGovernance from "hooks/contracts/useGovernance";
import useAllProposalData from "hooks/governance/useAllProposalData";

async function fetchProposalVoteHistory(_, gov, proposals, address) {
    const allProposalsWithReceipt = await Promise.all(
      proposals.map(async (proposal) => {
        const receipt = await gov.getReceipt(proposal.pid, address);

        const formattedReceipt = {
          hasVoted: receipt.hasVoted,
          support: receipt.support,
          votes: formatUnits(receipt.votes.toString(), 18),
        };

        return {
          ...proposal,
          receipt: formattedReceipt,
        };
      })
    );

    return allProposalsWithReceipt;
  };

export default function useUserProposalVoteHistory(address) {
  const gov = useGovernance();
  const { data: proposals } = useAllProposalData();

  const shouldFetch = address && gov && proposals;

  return useSWR(
    shouldFetch ? ["ProposalVoteHistory", gov, proposals, address, proposals] : null,
    fetchProposalVoteHistory
  );
}
