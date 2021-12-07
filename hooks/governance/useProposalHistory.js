import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import useGovernanceContract from "../contracts/useGovernanceContract";
import useReadProvider from "hooks/useReadProvider";
import { request, gql } from "graphql-request";
import { GRAPHQL_URLS } from "constants/variables";

const getProposalHistory = (chainId) => async (_, id) => {
  const query = gql`
    {
      proposalUpdates(where : {pid:${id}}) {
        id
        pid
        proposer
        action
        timestamp
      }
    }
  `;
  const logs = await request(GRAPHQL_URLS[chainId].gov, query);
  const pastEvents = await Promise.all(
    logs.proposalUpdates.map(async (log) => {
      const formattedEvent = {
        proposer: log.proposer,
        id: log?.pid.toString(),
        action: log.action,
        timestamp: log.timestamp.toString(),
        transactionHash: log.id.split("-")[0],
      };

      return formattedEvent;
    })
  );
  return pastEvents.flat().sort((a, b) => a.timestamp - b.timestamp);
};

export default function useProposalHistory(id) {
  const { chainId } = useWeb3React();
  const readProvider = useReadProvider();

  const govContract = useGovernanceContract();

  const shouldFetch = govContract && readProvider && chainId && id;

  return useSWR(
    shouldFetch ? ["ProposalHistory", id] : null,
    getProposalHistory(chainId)
  );
}
