import useSWR from "swr";
import { formatUnits } from "@ethersproject/units";

import useChainId from "hooks/useChainId";
import useReadProvider from "hooks/useReadProvider";
import useGovernance from "hooks/contracts/useGovernance";
import { useDataFromEventLogs } from "hooks/governance/useDataFromEventLogs";
import { BLOCK_SPEED } from "constants/variables";
import getDateFromBlock from "util/getDateFromBlock";

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
      return await govContract.proposals(event.pid);
    })
  );

  const allProposalStates = await Promise.all(
    formattedEvents.map(async (event) => {
      return await govContract.state(event.pid);
    })
  );

  const allProposalDetails = await Promise.all(
    formattedEvents.map(async (event) => {
      return await govContract.getActions(event.pid);
    })
  );

  const formattedAllProposals = allProposals
    .map((proposal, i) => {
      if (
        !proposal ||
        typeof allProposalStates[i] !== "number" ||
        !formattedEvents[i]
      ) {
        return false;
      }

      return {
        ...formattedEvents[i],
        signatures: allProposalDetails[i].signatures,
        calldatas: allProposalDetails[i].calldatas,
        targets: allProposalDetails[i].targets,
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
        proposer: proposal.proposer,
        status: ProposalStateStrings[allProposalStates[i]] || "Undetermined",
        forCount: parseFloat(formatUnits(proposal.forVotes.toString(), 18)),
        againstCount: parseFloat(
          formatUnits(proposal.againstVotes.toString(), 18)
        ),
        startBlock: parseInt(proposal.startBlock.toString()),
        endBlock: parseInt(proposal.endBlock.toString()),
        eta: parseInt(proposal.eta.toString()),
        type: "onchain",
      };
    })
    .filter(Boolean);

  const formattedAllProposalsWithTimestamp = await Promise.all(
    formattedAllProposals.map(async (proposal) => {
      const startTimestamp = await getDateFromBlock(
        library,
        proposal.startBlock,
        BLOCK_SPEED[chainId]
      );

      const endTimestamp = await getDateFromBlock(
        library,
        proposal.endBlock,
        BLOCK_SPEED[chainId]
      );

      return {
        ...proposal,
        startTimestamp,
        endTimestamp,
      };
    })
  );

  return formattedAllProposalsWithTimestamp.sort(
    (a, b) => b.startTimestamp - a.startTimestamp
  );
};

export default function useAllProposalData() {
  const readProvider = useReadProvider();
  const chainId = useChainId();

  const govContract = useGovernance();

  const { data: formattedEvents } = useDataFromEventLogs();

  const shouldFetch = Boolean(govContract && formattedEvents && library);

  return useSWR(
    shouldFetch
      ? [
          `AllProposalData-${formattedEvents.length}`,
          chainId,
          readProvider,
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
