import { request, gql } from "graphql-request";
import { GRAPHQL_URLS } from "constants/variables";

export default async function fetchGovernanceProposals(chainId) {
  const query = gql`
    {
      proposals(first: 999) {
        id
        pid
        proposer
        description
        targets
        signatures
        calldatas
      }
    }
  `;

  const logs = await request(GRAPHQL_URLS[chainId].gov, query);

  // reverse events to get them from newest to oldest
  const formattedEventData = logs.proposals
    .map((log) => {
      const hashId = log.id.split("-");
      const id = String(Number(hashId[1]) + 1);
      const hash = hashId[0];

      return {
        ...log,
        id,
        hash,
        description: log.description,
      };
    })
    .reverse();

  return formattedEventData;
}
