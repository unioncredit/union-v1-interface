import useGovernanceContract from "../contracts/useGovernanceContract";
import useReadProvider from "hooks/useReadProvider";
import useLogs from "hooks/data/useLogs";

const parseHistory = (contract, provider, id) => async (logs) => {
  const eventsWithLogs = await Promise.all(
    logs.map(async (event) => {
      const block = await provider.getBlock(event.blockNumber);

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

  return eventsWithLogs
    .filter((event) => event.id === id)
    .sort((a, b) => Number(a.timestamp) - Number(b.timestamp));
};

export default function useProposalHistory(id, blockNumber) {
  const readProvider = useReadProvider();
  const govContract = useGovernanceContract();
  const parser = parseHistory(govContract, readProvider, id);

  const filters = [
    govContract.filters["ProposalCreated"](),
    govContract.filters["ProposalCanceled"](),
    govContract.filters["ProposalExecuted"](),
    govContract.filters["ProposalQueued"](),
  ];

  return useLogs(filters, parser, {
    startBlock: blockNumber,
    startPosition: "START",
  });
}
