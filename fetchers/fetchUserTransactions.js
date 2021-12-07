import { request, gql } from "graphql-request";
import { GRAPHQL_URLS } from "constants/variables";

import { TransactionTypes } from "constants/app";
import { formatEther } from "@ethersproject/units";

const query = gql`
  query (
    $first: Int, 
    $vouchCancellationsFilter: VouchCancellation_filter,
    $trustLinesFilter: TrustLine_filter,
    $trustLinesFilter_Vouch: TrustLine_filter
  ) {
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
    ${TransactionTypes.TRUSTED}: trustLines(first: $first, where: $trustLinesFilter_Vouch) {
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
    vouchCancellationsFilter: {
      staker,
      ...borrowerVariable,
    },
    trustLinesFilter: {
      staker,
      ...borrowerVariable,
    },
    trustLinesFilter_Vouch: {
      borrower: staker,
      ...(borrower ? { staker: borrower } : {}),
    },
  };

  const resp = await request(GRAPHQL_URLS[chainId].user, query, variables);

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
