import { formatUnits } from "@ethersproject/units";
import useGovernanceContract from "hooks/useGovernanceContract";
import useSWR from "swr";
import useAllProposalData from "./useAllProposalData";

const getProposalVoteHistory = (govContract, proposals) => async (
  _,
  address
) => {
  const allProposalsWithReceipt = await Promise.all(
    proposals.map(async (proposal) => {
      const receipt = await govContract.getReceipt(proposal.id, address);

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

export default function useUserProposalVoteHistory(
  address = "0x6626593c237f530d15ae9980a95ef938ac15c35c"
) {
  const govContract = useGovernanceContract();

  const { data: proposals } = useAllProposalData();

  const shouldFetch = typeof address === "string" && govContract && proposals;

  return useSWR(
    shouldFetch ? ["ProposalVoteHistory", address, proposals] : null,
    getProposalVoteHistory(govContract, proposals)
  );
}
