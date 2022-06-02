import useSWR from "swr";
import useToken from "hooks/useToken";

function getLoanableAmount(_, assetManager, tokenAddress) {
  return assetManager.getLoanableAmount(tokenAddress);
}

export default function useLoanableAmount() {
  const DAI = useToken("DAI");
  const assetContract = useAssetContract();

  const shouldFetch = !!assetManager && DAI;

  return useSWR(
    shouldFetch ? ["useLoanableAmount", assetContract, DAI] : null,
    getLoanableAmount
  );
}
