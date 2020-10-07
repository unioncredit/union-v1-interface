import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import useGovernanceContract from "hooks/governance/useGovernanceContract";
import useSWR from "swr";
import { useDataFromEventLogs } from "./useDataFromEventLogs";
import useProposalCount from "./useProposalCount";

const enumerateProposalState = (state) => {
  const proposalStates = [
    "pending",
    "active",
    "canceled",
    "defeated",
    "succeeded",
    "queued",
    "expired",
    "executed",
  ];

  return proposalStates[state];
};

const getAllProposalData = (
  govContract,
  library,
  proposalIndexes,
  formattedEvents
) => async () => {
  const allProposals = await Promise.all(
    proposalIndexes.map(async (proposalID) => {
      const res = await govContract.proposals(proposalID);

      return {
        result: res,
      };
    })
  );

  const allProposalStates = await Promise.all(
    proposalIndexes.map(async (proposalID) => {
      const res = await govContract.state(proposalID);

      return {
        result: res,
      };
    })
  );

  allProposals.reverse();
  allProposalStates.reverse();

  const formattedAllProposals = allProposals
    .filter((p, i) => {
      return (
        Boolean(p.result) &&
        Boolean(allProposalStates[i]?.result) &&
        Boolean(formattedEvents[i])
      );
    })
    .map((p, i) => {
      const formattedProposal = {
        id: allProposals[i]?.result?.id.toString(),
        title: formattedEvents[i].description?.split(/# |\n/g)[1] || "Untitled",
        description:
          formattedEvents[i].description?.split(/# /)[1] || "No description.",
        proposer: allProposals[i]?.result?.proposer,
        status:
          enumerateProposalState(allProposalStates[i]?.result) ??
          "Undetermined",
        forCount: parseFloat(
          formatUnits(allProposals[i]?.result?.forVotes.toString(), 18)
        ),
        againstCount: parseFloat(
          formatUnits(allProposals[i]?.result?.againstVotes.toString(), 18)
        ),
        startBlock: parseInt(allProposals[i]?.result?.startBlock?.toString()),
        endBlock: parseInt(allProposals[i]?.result?.endBlock?.toString()),
        details: formattedEvents[i].details,
        type: "onchain",
      };

      return formattedProposal;
    });

  return Promise.all(
    formattedAllProposals.map(async (prop) => {
      const block = await library.getBlock(prop.endBlock);

      return {
        ...prop,
        date: block.timestamp.toString(),
      };
    })
  );
};

export default function useAllProposalData() {
  const { library } = useWeb3React();

  const govContract = useGovernanceContract();

  const { data: proposalCount } = useProposalCount();

  const proposalIndexes = [];
  for (let i = 1; i <= (proposalCount ?? 0); i++) {
    proposalIndexes.push([i]);
  }

  // get metadata from past events
  const { data: formattedEvents } = useDataFromEventLogs();

  const shouldFetch = govContract && proposalCount && formattedEvents;

  return useSWR(
    shouldFetch ? ["AllProposalData"] : null,
    getAllProposalData(govContract, library, proposalIndexes, formattedEvents)
  );
}
