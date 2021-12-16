import { defaultAbiCoder } from "@ethersproject/abi";
import { request, gql } from "graphql-request";
import { GRAPHQL_URLS } from "constants/variables";

export default async function fetchGovernanceProposals(chainId) {
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

  const logs = await request(GRAPHQL_URLS[chainId].gov, query);

  // reverse events to get them from newest to oldest
  const formattedEventData = logs.proposals
    .map((log, i) => {
      return {
        ...log,
        displayId: i + 1,
        description: log.description,
        details: log.targets.map((target, i) => {
          const signature = log.signatures[i];
          const [name, types] = signature
            .substr(0, signature.length - 1)
            .split("(");
          const calldata = log.calldatas[i];
          const decoded =
            types && calldata
              ? defaultAbiCoder.decode(types.split(","), calldata)
              : [];
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
}
