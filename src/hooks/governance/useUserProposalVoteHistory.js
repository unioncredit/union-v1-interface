import useSWR from "swr";
import { formatUnits } from "@ethersproject/units";

import useGovernance from "hooks/contracts/useGovernance";
import useProposals from "hooks/governance/useProposals";

function fetchProposalVoteHistory(gov) {
  return async function (_, proposals, address) {
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
}

export default function useUserProposalVoteHistory(address) {
  const gov = useGovernance();
  const { data: proposals } = useProposals();

  const shouldFetch = address && gov && proposals;

  return useSWR(
    shouldFetch ? ["ProposalVoteHistory", proposals, address, proposals] : null,
    fetchProposalVoteHistory(gov)
  );
}
