import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import { useGovernanceTokenContract } from "./useGovernanceContract";

const getDelegateChangedData = (contract, library) => async (
  _,
  __,
  ___,
  address
) => {
  const filter = {
    ...contract.filters["DelegateChanged"](),
    fromBlock: 9601459,
    toBlock: "latest",
  };

  const logs = await library.getLogs(filter);

  const events = await Promise.all(
    logs.map(async (log) => {
      const block = await library.getBlock(log.blockNumber);

      const eventParsed = contract.interface.parseLog(log);

      const formattedEvent = {
        delegator: eventParsed.args?.delegator,
        fromDelegate: eventParsed.args?.fromDelegate,
        toDelegate: eventParsed.args?.toDelegate,
        timestamp: block.timestamp.toString(),
      };

      return formattedEvent;
    })
  );

  const eventsByDelegator = events
    .sort((a, b) => a.timestamp - b.timestamp)
    .filter((event) => event.delegator === address)
    .pop();

  if (eventsByDelegator.delegator === eventsByDelegator.toDelegate)
    return "Self";

  return "Other";
};

export default function useDelegateChangedData(address) {
  const { library } = useWeb3React();
  const govTokenContract = useGovernanceTokenContract();

  const shouldFetch = govTokenContract && library;

  return useSWR(
    shouldFetch ? ["DelegateChangedData", address] : null,
    getDelegateChangedData(govTokenContract, library)
  );
}
