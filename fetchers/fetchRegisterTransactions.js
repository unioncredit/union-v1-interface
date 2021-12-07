import { request, gql } from "graphql-request";
import { GRAPHQL_URLS } from "constants/variables";

import { TransactionTypes } from "constants/app";

const query = gql`
  query (
    $first: Int, 
    $memberApplicationsFilter: MemberApplication_filter,
  ) {
    ${TransactionTypes.REGISTER}: memberApplications(first: $first, where: $memberApplicationsFilter) {
      applicant
      timestamp
    }
  }
`;

export default async function fetchUserTransactions(chainId, account) {
  const variables = {
    first: 100,
    memberApplicationsFilter: {
      applicant: account,
    },
  };

  const resp = await request(GRAPHQL_URLS[chainId].user, query, variables);

  const flattened = Object.keys(resp).reduce((acc, key) => {
    const parsed = resp[key].map((item) => ({
      ...item,
      type: key,
    }));

    return [...acc, ...parsed];
  }, []);

  const sorted = flattened.sort((a, b) => {
    return Number(b.timestamp) - Number(a.timestamp);
  });

  return sorted;
}
