import useSWR from "swr";
import { defaultAbiCoder } from "@ethersproject/abi";
import { request, gql } from "graphql-request";
import { GRAPHQL_URL } from "constants/variables";
import useChainId from "hooks/useChainId";

const fetchData = (chainId) => async () => {
  const query = gql`
    {
      proposals(first: 999) {
        id
        proposer
        description
        targets
        signatures
        calldatas
      }
    }
  `;

  const logs = await request(GRAPHQL_URL[chainId] + "gov", query);

  // reverse events to get them from newest to oldest
  const formattedEventData = logs.proposals
    .map((log) => {
      return {
        description: log.description,
        details: log.targets.map((target, i) => {
          const signature = log.signatures[i];
          const [name, types] = signature
            .substr(0, signature.length - 1)
            .split("(");
          const calldata = log.calldatas[i];
          const decoded = defaultAbiCoder.decode(types.split(","), calldata);
          return {
            target,
            functionSig: name,
            callData: decoded.join(", "),
          };
        }),
      };
    })
    .reverse();

  return formattedEventData;
};

export function useDataFromEventLogs() {
  const chainId = useChainId();

  const shouldFetch = chainId;

  return useSWR(shouldFetch ? ["EventLogsData"] : null, fetchData(chainId), {
    shouldRetryOnError: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
}
