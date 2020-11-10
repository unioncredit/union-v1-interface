import { defaultAbiCoder } from "@ethersproject/abi";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import { useCallback } from "react";

const encode = (type, value) => defaultAbiCoder.encode([type], [value]);

export default function usePropose() {
  const governanceContract = useGovernanceContract();

  return useCallback(async (data) => {
    const targets = data.actions.flatMap((action) => action.targets);
    const values = data.actions.flatMap((action) => action.values);
    const signatures = data.actions.flatMap((action) => action.signatures);
    const calldatas = data.actions
      .flatMap((action) => action.calldata)
      .map((data) => encode(data.type, data.value));

    const description = `
# ${data.title}

${data.description}`;

    return governanceContract.propose(
      targets,
      values,
      signatures,
      calldatas,
      description
    );
  }, []);
}
