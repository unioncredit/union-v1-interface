import { defaultAbiCoder, Interface } from "@ethersproject/abi";
import { useWeb3React } from "@web3-react/core";
import { GOV_ABI } from "constants/governance";
import useGovernanceContract from "hooks/governance/useGovernanceContract";
import useSWR from "swr";

const fetchData = (contract, library) => async () => {
  const filter = {
    ...contract?.filters?.["ProposalCreated"](),
    fromBlock: 0,
    toBlock: "latest",
  };

  const pastEvents = await library.getLogs(filter);

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
  const { library } = useWeb3React();
  const govContract = useGovernanceContract();

  const shouldFetch = govContract && library;

  return useSWR(
    shouldFetch ? ["EventLogsData"] : null,
    fetchData(govContract, library),
    {
      shouldRetryOnError: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}
