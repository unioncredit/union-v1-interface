import useSWR from "swr";
import useToken from "hooks/useToken";
import useUserManager from "hooks/contracts/useUserManager";
import { Contract } from "@ethersproject/contracts";
import useReadProvider from "./useReadProvider";

function fetchEffectiveNumber(userManager, provider) {
  return async function () {
    const creditLimitModal = await userManager.creditLimitModel();
    const contract = new Contract(
      creditLimitModal,
      ["function effectiveNumber() external view returns (uint256)"],
      provider
    );
    return contract.effectiveNumber();
  };
}

export default function useEffectiveNumber() {
  const DAI = useToken();
  const readProvider = useReadProvider();
  const userManager = useUserManager(DAI);

  const shouldFetch = !!userManager && !!readProvider;

  return useSWR(
    shouldFetch ? ["useEffectiveNumber"] : null,
    fetchEffectiveNumber(userManager, readProvider)
  );
}
