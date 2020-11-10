import { defaultAbiCoder } from "@ethersproject/abi";
import useGovernanceContract from "hooks/contracts/useGovernanceContract";
import { useCallback } from "react";

const encode = (type, value) => defaultAbiCoder.encode([type], [value]);

export default function usePropose() {
  const governanceContract = useGovernanceContract();

  return useCallback(async (data) => {
    console.log(data);

    const targets = data.actions.flatMap((action) => action.targets);
    const values = data.actions.flatMap((action) => action.values);
    const signatures = data.actions.flatMap((action) => action.signatures);
    const calldatas = data.actions
      .flatMap((action) => action.calldata)
      .map((data) => encode(data.type, data.value));

    const description = `
# ${data.title}

${data.description}`;

    console.log({ targets, values, signatures, calldatas, description });

    return governanceContract.propose(
      ["0x9BFf08164fD83F6349c347Dc755Ea5549f88410b"],
      ["0"],
      ["setNewMemberFee(uint256)"],
      ["0x0000000000000000000000000000000000000000000000000000000000000064"],
      "set new member fee"
    );
  }, []);
}
