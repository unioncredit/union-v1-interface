import { request, gql } from "graphql-request";
import { GRAPHQL_URL } from "constants/variables";
import { DEFAULT_CHAIN_ID } from "constants/app";

const query = gql`
  query ($first: Int, $memberApplicationsFilter: MemberApplication_filter) {
    memberApplications(first: $first, where: $memberApplicationsFilter) {
      applicant
      timestamp
    }
  }
`;

export default async function fetchMemberApplication(applicant) {
  const variables = {
    first: 100,
    memberApplicationsFilter: {
      applicant,
    },
  };

  const resp = await request(
    GRAPHQL_URL[DEFAULT_CHAIN_ID] + "user",
    query,
    variables
  );

  return resp?.memberApplications?.[0]?.timestamp || 0;
}
