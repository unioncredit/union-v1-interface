import { formatUnits } from "@ethersproject/units";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import useSWR from "swr";
import { useDataFromEventLogs } from "./useDataFromEventLogs";
import dayjs from "dayjs";
import useReadProvider from "hooks/useReadProvider";
import useChainId from "hooks/useChainId";

const ProposalStateStrings = [
  "pending",
  "active",
  "canceled",
  "defeated",
  "succeeded",
  "queued",
  "expired",
  "executed",
];

const getAllProposalData = async (
  _,
  _chainId,
  library,
  govContract,
  formattedEvents
) => {
  const allProposals = await Promise.all(
    formattedEvents.map(async (event) => {
      return await govContract.proposals(event.id);
    })
  );

  const allProposalStates = await Promise.all(
    formattedEvents.map(async (event) => {
      return await govContract.state(event.id);
    })
  );

  allProposals.reverse();
  allProposalStates.reverse();

  const formattedAllProposals = allProposals
    .filter((proposal, i) => {
      return (
        Boolean(proposal) &&
        Boolean(allProposalStates[i]) &&
        Boolean(formattedEvents[i])
      );
    })
    .map((proposal, i) => ({
      ...formattedEvents[i],
      id: proposal?.id.toString(),
      title:
        String(formattedEvents[i].description)
          ?.replace(/\\{1,2}n/g, "\n")
          ?.split("\n")
          ?.filter(Boolean)[0] || "Untitled",
      description:
        String(formattedEvents[i].description)
          ?.replace(/\\{1,2}n/, "\n")
          ?.split("\n")
          ?.slice(2)
          ?.join("\n\n") || "No description",
      proposer: proposal?.proposer,
      status: ProposalStateStrings[allProposalStates[i]] || "Undetermined",
      forCount: parseFloat(formatUnits(proposal?.forVotes.toString(), 18)),
      againstCount: parseFloat(
        formatUnits(proposal?.againstVotes.toString(), 18)
      ),
      startBlock: parseInt(proposal?.startBlock?.toString()),
      endBlock: parseInt(proposal?.endBlock?.toString()),
      eta: parseInt(proposal?.eta?.toString()),
      details: formattedEvents[i].details,
      type: "onchain",
    }));

  const currentBlock = await library.getBlockNumber();

  const formattedAllProposalsWithTimestamp = await Promise.all(
    formattedAllProposals.map(async (proposal) => {
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

  const { data: formattedEvents } = useDataFromEventLogs();

  const shouldFetch = Boolean(govContract && formattedEvents && library);

  return useSWR(
    shouldFetch
      ? [
          `AllProposalData-${formattedEvents.length}`,
          chainId,
          library,
          govContract,
          formattedEvents,
        ]
      : null,
    getAllProposalData,
    {
      shouldRetryOnError: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}
