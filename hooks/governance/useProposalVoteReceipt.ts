import type { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import useSWR from "swr";

const getProposalVoteReceipt = async (
  _: any,
  address: string,
  proposalId: string,
  govContract: Contract
) => {
  const receipt: {
    hasVoted: boolean;
    support: boolean;
    votes: BigNumber;
  } = await govContract.getReceipt(proposalId, address);

  const formattedReceipt = {
    hasVoted: receipt.hasVoted,
    support: receipt.support,
    votes: formatUnits(receipt.votes, 18),
  };

  return formattedReceipt;
};

export default function useProposalVoteReceipt(
  address: string,
  proposalId: string
) {
  const govContract = useGovernanceContract();

  const shouldFetch = typeof address === "string" && proposalId && govContract;

  return useSWR(
    shouldFetch
      ? ["ProposalVoteReceipt", address, proposalId, govContract]
      : null,
    getProposalVoteReceipt
  );
}
