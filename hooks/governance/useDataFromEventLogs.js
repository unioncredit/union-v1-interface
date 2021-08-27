import { defaultAbiCoder, Interface } from "@ethersproject/abi";
import { GOV_ABI } from "constants/governance";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import useLogs from "hooks/data/useLogs";

const parseProposalLogs = async (logs) => {
  const eventParser = new Interface(GOV_ABI);
  // reverse events to get them from newest to oldest
  const formattedEventData = logs
    .map((event) => {
      const eventParsed = eventParser.parseLog(event).args;

      return {
        ...event,
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
  const govContract = useGovernanceContract();
  const proposalFilter = govContract?.filters.ProposalCreated();
  const logs = useLogs([proposalFilter], parseProposalLogs);
  return logs;
}
