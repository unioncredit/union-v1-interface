import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import useGovernanceContract from "./useGovernanceContract";

const getProposalHistory = (contract, library) => async (_, id) => {
  const params = { fromBlock: 9601459, toBlock: "latest" };

  const filters = [
    {
      ...contract.filters["ProposalCreated"](),
      ...params,
    },
    {
      ...contract.filters["ProposalCanceled"](),
      ...params,
    },
    {
      ...contract.filters["ProposalExecuted"](),
      ...params,
    },
    {
      ...contract.filters["ProposalQueued"](),
      ...params,
    },
  ];

  const pastEvents = await Promise.all(
    filters.map(async (filter) => {
      const events = await library.getLogs(filter);

      const eventsWithLogs = await Promise.all(
        events.map(async (event) => {
          const block = await library.getBlock(event.blockNumber);

          const eventParsed = contract.interface.parseLog(event);

          const formattedEvent = {
            args: eventParsed.args,
            id: eventParsed.args?.id.toString(),
            name: eventParsed.name,
            timestamp: block.timestamp.toString(),
            transactionHash: event.transactionHash,
          };

          return formattedEvent;
        })
      );

      return eventsWithLogs;
    })
  );

  return pastEvents
    .flat()
    .filter((event) => event.id === id)
    .sort((a, b) => a.timestamp - b.timestamp);
};

export default function useProposalHistory(id) {
  const { library } = useWeb3React();

  const govContract = useGovernanceContract();

  const shouldFetch = govContract && library && id;

  return useSWR(
    shouldFetch ? ["ProposalHistory", id] : null,
    getProposalHistory(govContract, library)
  );
}
