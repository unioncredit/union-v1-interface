import { formatUnits } from "@ethersproject/units";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import useSWR from "swr";

const getProposalVoteReceipt = (govContract) => async (
  _,
  address,
  proposalId
) => {
  const receipt = await govContract.getReceipt(proposalId, address);

  const formattedReceipt = {
    hasVoted: receipt.hasVoted,
    support: receipt.support,
    votes: formatUnits(receipt.votes.toString(), 18),
  };

  return formattedReceipt;
};

export default function useProposalVoteReceipt(address, proposalId) {
  const govContract = useGovernanceContract();

  const shouldFetch = typeof address === "string" && proposalId && govContract;

  return useSWR(
    shouldFetch ? ["ProposalVoteReceipt", address, proposalId] : null,
    getProposalVoteReceipt(govContract)
  );
}
