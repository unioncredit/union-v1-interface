import type { Contract } from "@ethersproject/contracts";
import { formatUnits } from "@ethersproject/units";
import useAssetContract from "hooks/contracts/useAssetContract";
import useCurrentToken from "hooks/useCurrentToken";
import useSWR from "swr";

const getLoanableAmount =
  (contract: Contract) => async (_: any, tokenAddress: string) => {
    const res = await contract.getLoanableAmount(tokenAddress);

    return Number(formatUnits(res, 18));
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
