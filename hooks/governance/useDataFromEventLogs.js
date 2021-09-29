import { defaultAbiCoder, Interface } from "@ethersproject/abi";
import { useWeb3React } from "@web3-react/core";
import { GOV_ABI } from "constants/governance";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import useSWR from "swr";
import useReadProvider from "hooks/useReadProvider";
import { getLogs } from "lib/logs";
import { request, gql } from "graphql-request";
import { GRAPHQL_URL } from "constants/variables";

const fetchData = (contract, provider, chainId) => async () => {
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
  const { chainId } = useWeb3React();
  const readProvider = useReadProvider();
  const govContract = useGovernanceContract();

  const shouldFetch = govContract && chainId && readProvider;

  return useSWR(
    shouldFetch ? ["EventLogsData"] : null,
    fetchData(govContract, readProvider, chainId),
    {
      shouldRetryOnError: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}
