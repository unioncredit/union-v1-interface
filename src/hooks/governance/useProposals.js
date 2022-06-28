import useSWR from "swr";
import useChainId from "hooks/useChainId";
import fetchGovernanceProposals from "fetchers/fetchGovernanceProposals";
import useGovernance from "hooks/contracts/useGovernance";
import getDateFromBlock from "util/getDateFromBlock";
import { BLOCK_SPEED } from "constants/variables";
import useReadProvider from "hooks/useReadProvider";

const proposalStateStrings = [
  "pending",
  "active",
  "canceled",
  "defeated",
  "succeeded",
  "queued",
  "expired",
  "executed",
];

function fetchProposals(gov, provider) {
  return async function (_, chainId) {
    let proposals = await fetchGovernanceProposals(chainId);

    // Populate events with extra data
    proposals = await Promise.all(
      proposals.map(async (proposal) => {
        const details = await gov.proposals(proposal.pid);
        const state = await gov.state(proposal.pid);
        const { signatures, calldatas, targets } = await gov.getActions(
          proposal.pid
        );

        const title =
          String(proposal.description)
            ?.replace(/\\{1,2}n/g, "\n")
            ?.split("\n")
            ?.filter(Boolean)[0] || "Untitled";

        const description =
          String(proposal.description)
            ?.replace(/\\{1,2}n/, "\n")
            ?.split("\n")
            ?.slice(2)
            ?.join("\n\n") || "No description";

        return {
          ...proposal,
          ...details,
          signatures,
          calldatas,
          targets,
          title,
          description,
          status: proposalStateStrings[state] || "Undetermined",
          type: "onchain",
        };
      })
    );

    // Populate proposals with timestamps
    proposals = await Promise.all(
      proposals.map(async (proposal) => {
        const startTimestamp = await getDateFromBlock(
          provider,
          Number(proposal.startBlock),
          BLOCK_SPEED[chainId]
        );

        const endTimestamp = await getDateFromBlock(
          provider,
          Number(proposal.endBlock),
          BLOCK_SPEED[chainId]
        );

        return {
          ...proposal,
          startTimestamp,
          endTimestamp,
        };
      })
    );

    return proposals.sort((a, b) => b.startTimestamp - a.startTimestamp);
  };
}

export default function useProposals() {
  const gov = useGovernance();
  const chainId = useChainId();
  const readProvider = useReadProvider();

  const shouldFetch = chainId && gov && readProvider;

  return useSWR(
    shouldFetch ? ["useProposals", chainId] : null,
    fetchProposals(gov, readProvider),
    {
      shouldRetryOnError: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}
