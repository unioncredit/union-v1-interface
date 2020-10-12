import { AddressZero } from "constants/variables";
import useSWR from "swr";
import { useGovernanceTokenContract } from "./useGovernanceContract";

const getUserDelegateStatus = (contract) => async (_, address) => {
  /**
   * @type {string}
   */
  const delegates = await contract.delegates(address);

  if (delegates === address || delegates === AddressZero) return "Self";

  return delegates;
};

export default function useUserDelegateStatus(address) {
  const govTokenContract = useGovernanceTokenContract();

  const shouldFetch = Boolean(govTokenContract);

  return useSWR(
    shouldFetch ? ["UserDelegateStatus", address] : null,
    getUserDelegateStatus(govTokenContract)
  );
}
