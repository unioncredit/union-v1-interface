import { request, gql } from "graphql-request";
import { GRAPHQL_URL } from "constants/variables";

import { TransactionTypes } from "constants/app";
import { formatEther } from "@ethersproject/units";

const graphKeyLookupTable = {
  memberApplications: TransactionTypes.REGISTER,
  vouchCancellations: TransactionTypes.CANCEL,
  trustLines: TransactionTypes.TRUST,
};

export default async function fetchUserTransactions(chainId, address) {
  const query = gql`
    query ($first: Int, $applicant: Bytes) {
      memberApplications(first: $first, where: { applicant: $applicant }) {
        applicant
        timestamp
      }
      vouchCancellations(first: $first, where: { staker: $applicant }) {
        borrower
        staker
        timestamp
      }
      trustLines(first: $first, where: { staker: $applicant }) {
        amount
        borrower
        staker
        timestamp
      }
    }
  `;

  const variables = {
    first: 100,
    applicant: address,
  };

  const resp = await request(GRAPHQL_URL[chainId] + "user", query, variables);

  const flattened = Object.keys(resp).reduce((acc, key) => {
    const parsed = resp[key].map((item) => {
      const transactionType = graphKeyLookupTable[key];

      if (item.amount) {
        item.amount = formatEther(item.amount);
      }

      if (transactionType === TransactionTypes.TRUST) {
        item.address = item.borrower;
      }

      return {
        ...item,
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
