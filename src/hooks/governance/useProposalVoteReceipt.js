import useSWR from "swr";
import { formatUnits } from "@ethersproject/units";

import useGovernance from "hooks/contracts/useGovernance";

async function fetchProposalVoteReceipt(_, gov, address, proposalId) {
  const receipt = await gov.getReceipt(proposalId, address);

  const formattedReceipt = {
    hasVoted: receipt.hasVoted,
    support: receipt.support,
    votes: formatUnits(receipt.votes, 18),
  };

  return formattedReceipt;
}

export default function useProposalVoteReceipt(address, proposalId) {
  const gov= useGovernance();

  const shouldFetch = address && proposalId && gov;

  return useSWR(
    shouldFetch
      ? ["ProposalVoteReceipt", gov, address, proposalId]
      : null,
    fetchProposalVoteReceipt,
  );
}
