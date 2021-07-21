import { defaultAbiCoder, Interface } from "@ethersproject/abi";
import { useWeb3React } from "@web3-react/core";
import { GOV_ABI } from "constants/governance";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import useSWR from "swr";
import useReadProvider from "hooks/useReadProvider";
import { getLogs } from "lib/logs";

const fetchData = (contract, provider, chainId) => async () => {
  const filter = {
    ...contract?.filters?.["ProposalCreated"](),
    fromBlock: 0,
    toBlock: "latest",
  };

  const pastEvents = await getLogs(provider, chainId, filter);

  const eventParser = new Interface(GOV_ABI);

  // reverse events to get them from newest to oldest
  const formattedEventData = pastEvents
    .map((event) => {
      const eventParsed = eventParser.parseLog(event).args;

      return {
        description: eventParsed.description,
        details: eventParsed.targets.map((target, i) => {
          const signature = eventParsed.signatures[i];

          const [name, types] = signature
            .substr(0, signature.length - 1)
            .split("(");

          const calldata = eventParsed.calldatas[i];

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
