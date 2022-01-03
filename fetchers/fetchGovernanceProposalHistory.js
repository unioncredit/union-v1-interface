import { request, gql } from "graphql-request";
import { GRAPHQL_URLS } from "constants/variables";

const query = gql`
  query ProposalUpdates($where: ProposalUpdate_filter) {
    proposalUpdates(where: $where) {
      id
      proposer
      action
      timestamp
    }
  }
`;

export default async function fetchGovernanceProposals(chainId, pid) {
  const variables = {
    where: {
      pid: pid.toString(),
    },
  };

  const logs = await request(GRAPHQL_URLS[chainId].gov, query, variables);

  return logs.proposalUpdates;
}
