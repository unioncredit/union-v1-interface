import { formatUnits } from "@ethersproject/units";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import useSWR from "swr";
import { useDataFromEventLogs } from "./useDataFromEventLogs";
import useProposalCount from "./useProposalCount";
import dayjs from "dayjs";
import useReadProvider from "hooks/useReadProvider";
import useChainId from "hooks/useChainId";

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

const getAllProposalData =
  (govContract, library, proposalIndexes, formattedEvents) => async () => {
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
          title:
            String(formattedEvents[i].description)
              ?.split("\n")[0]
              ?.replace("#", "") ||
            String(formattedEvents[i].description)
              ?.split("\n")[1]
              ?.replace("#", "") ||
            "Untitled",
          description:
            String(formattedEvents[i].description)
              ?.split("\n")
              ?.slice(2)
              ?.join("\n\n") || "No description",
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
          eta: parseInt(allProposals[i]?.result?.eta?.toString()),
          details: formattedEvents[i].details,
          type: "onchain",
        };

        return formattedProposal;
      });

    const formattedAllProposalsWithTimestamp = await Promise.all(
      formattedAllProposals.map(async (proposal) => {
        const currentBlock = await library.getBlockNumber();

        let date = `Ends in ${proposal.endBlock - Number(currentBlock)} Blocks`;

        let endTimestamp = "";

        if (proposal.endBlock < currentBlock) {
          try {
            const block = await library.getBlock(proposal.endBlock);

            const formattedDate = dayjs
              .unix(block.timestamp.toString())
              .format("MMM D, YYYY");

            date = `${proposal.status} on ${formattedDate}`;
            endTimestamp = block.timestamp.toString();
          } catch (err) {
            console.error(err);
          }
        }

        return {
          ...proposal,
          date,
          endTimestamp,
        };
      })
    );

    return formattedAllProposalsWithTimestamp;
  };

export default function useAllProposalData() {
  const library = useReadProvider();
  const chainId = useChainId();

  const govContract = useGovernanceContract(library);

  const { data: proposalCount } = useProposalCount();
  const proposalIndexes = [];
  for (let i = 1; i <= (proposalCount ?? 0); i++) {
    proposalIndexes.push([i]);
  }

  // get metadata from past events
  const { data: formattedEvents } = useDataFromEventLogs();

  const shouldFetch = Boolean(
    govContract && typeof proposalCount !== undefined && formattedEvents
  );

  return useSWR(
    shouldFetch
      ? [
          // putting `proposalIndexes.length` and `formattedEvents.length` in cache key
          // so that refetch is triggered when their length changes
          `AllProposalData-${proposalIndexes.length}-${formattedEvents.length}`,
          chainId,
        ]
      : null,
    getAllProposalData(govContract, library, proposalIndexes, formattedEvents),
    {
      shouldRetryOnError: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}
