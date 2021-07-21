import { defaultAbiCoder } from "@ethersproject/abi";
import type { TransactionResponse } from "@ethersproject/providers";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import { useCallback } from "react";
import type { Proposal } from "types";

export default function usePropose() {
  const governanceContract = useGovernanceContract();

  return useCallback(
    async (data: Proposal): Promise<TransactionResponse> => {
      const targets = data.actions.flatMap((action) => action.targets);
      const values = data.actions.flatMap((action) => action.values);
      const signatures = data.actions.flatMap((action) => action.signatures);
      const calldatas = data.actions.map((action) => {
        const types = action.calldata.map((data) => data.type);
        const values = action.calldata.map((data) => data.value);
        return defaultAbiCoder.encode(types, values);
      });

      const description = `
${data.title}

${data.description}`;

      return governanceContract.propose(
        targets,
        values,
        signatures,
        calldatas,
        description
      );
    },
    [governanceContract]
  );
}
