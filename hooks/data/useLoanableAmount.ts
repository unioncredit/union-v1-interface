import type { Contract } from "@ethersproject/contracts";
import useAssetContract from "hooks/contracts/useAssetContract";
import useCurrentToken from "hooks/useCurrentToken";
import useSWR from "swr";

const getLoanableAmount =
  (contract: Contract) => async (_: any, tokenAddress: string) => {
    return await contract.getLoanableAmount(tokenAddress);
  };

export default function useLoanableAmount() {
  const assetContract = useAssetContract();
  const DAI = useCurrentToken();

  const shouldFetch = !!assetContract && typeof DAI === "string";

  return useSWR(
    shouldFetch ? ["LoanableAmount", DAI] : null,
    getLoanableAmount(assetContract)
  );
}
