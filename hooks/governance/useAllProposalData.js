import { formatUnits } from "@ethersproject/units";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import useSWR from "swr";
import { useDataFromEventLogs } from "./useDataFromEventLogs";
import useReadProvider from "hooks/useReadProvider";
import useChainId from "hooks/useChainId";
import { BLOCK_SPEED } from "constants/variables";

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
  chainId,
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

  const formattedAllProposals = allProposals
    .map((proposal, i) => {
      if (!proposal || !allProposalStates[i] || !formattedEvents[i]) {
        return false;
      }

      return {
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
      };
    })
    .filter(Boolean);

  const currentBlock = await library.getBlockNumber();

  const formattedAllProposalsWithTimestamp = await Promise.all(
    formattedAllProposals.map(async (proposal) => {
      const startBlock = await library.getBlock(proposal.startBlock);
      const startTimestamp = startBlock.timestamp.toString();

      if (proposal.endBlock < currentBlock) {
        const endBlock = await library.getBlock(proposal.endBlock);
        const endTimestamp = endBlock.timestamp.toString();

        return {
          ...proposal,
          startTimestamp,
          endTimestamp,
        };
      }

      const blockPerDay = BLOCK_SPEED[chainId] * 60 * 60;

      const secondsDay = 60 * 60 * 24; // 86400

      const blockDelta = proposal.endBlock - currentBlock;
      const timestampDelta = (blockDelta / blockPerDay) * secondsDay;

      return {
        ...proposal,
        startTimestamp,
        endTimestamp: startTimestamp + timestampDelta,
      };
    })
  );

  return formattedAllProposalsWithTimestamp.sort(
    (a, b) => b.startTimestamp - a.startTimestamp
  );
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
