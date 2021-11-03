import { request, gql } from "graphql-request";
import { GRAPHQL_URL } from "constants/variables";

import { TransactionTypes } from "constants/app";
import { formatEther } from "@ethersproject/units";

const query = gql`
  query (
    $first: Int, 
    $memberApplicationsFilter: MemberApplication_filter,
    $vouchCancellationsFilter: VouchCancellation_filter,
    $trustLinesFilter: TrustLine_filter
  ) {
    ${TransactionTypes.REGISTER}: memberApplications(first: $first, where: $memberApplicationsFilter) {
      applicant
      timestamp
    }
    ${TransactionTypes.CANCEL}: vouchCancellations(first: $first, where: $vouchCancellationsFilter) {
      borrower
      staker
      timestamp
    }
    ${TransactionTypes.TRUST}: trustLines(first: $first, where: $trustLinesFilter) {
      amount
      borrower
      staker
      timestamp
    }
  }
`;

export default async function fetchUserTransactions(chainId, staker, borrower) {
  const borrowerVariable = borrower ? { borrower } : {};

  const variables = {
    first: 100,
    memberApplicationsFilter: {
      applicant: staker,
    },
    vouchCancellationsFilter: {
      staker,
      ...borrowerVariable,
    },
    trustLinesFilter: {
      staker,
      ...borrowerVariable,
    },
  };

  const resp = await request(GRAPHQL_URL[chainId] + "user", query, variables);

  const flattened = Object.keys(resp).reduce((acc, key) => {
    const parsed = resp[key].map((item) => {
      if (item.amount) {
        item.amount = formatEther(item.amount);
      }

      if (key === TransactionTypes.TRUST) {
        item.address = item.borrower;
      }

      return {
        ...item,
        type: key,
      };
    });

    return [...acc, ...parsed];
  }, []);

  const sorted = flattened.sort((a, b) => {
    return Number(b.timestamp) - Number(a.timestamp);
  });

  return sorted;
}
