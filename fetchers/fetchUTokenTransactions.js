import { request, gql } from "graphql-request";
import { GRAPHQL_URL } from "constants/variables";

import { TransactionTypes } from "constants/app";
import { formatEther } from "@ethersproject/units";

const graphKeyLookupTable = {
  borrows: TransactionTypes.BORROW,
  repays: TransactionTypes.REPAY,
};

export default async function fetchUTokenTransactions(chainId, address) {
  const query = gql`
    query ($first: Int, $account: Bytes) {
      borrows(first: $first, where: { account: $account }) {
        account
        amount
        fee
        timestamp
      }
      repays(first: $first, where: { account: $account }) {
        account
        amount
        timestamp
      }
    }
  `;

  const variables = {
    first: 100,
    account: address,
  };

  const resp = await request(GRAPHQL_URL[chainId] + "utoken", query, variables);

  const flattened = Object.keys(resp).reduce((acc, key) => {
    const parsed = resp[key].map((item) => {
      const transactionType = graphKeyLookupTable[key];

      if (item.amount) {
        item.amount = formatEther(item.amount);
      }

      return {
        ...item,
        address: item.account,
        type: transactionType,
      };
    });

    return [...acc, ...parsed];
  }, []);

  const sorted = flattened.sort((a, b) => {
    return Number(b.timestamp) - Number(a.timestamp);
  });

  return sorted;
}
