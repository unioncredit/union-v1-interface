import useSWR from "swr";
import useToken from "hooks/useToken";
import useAssetManager from "hooks/contracts/useAssetManager";

function getLoanableAmount(_, assetManager, tokenAddress) {
  return assetManager.getLoanableAmount(tokenAddress);
}

export default function useLoanableAmount() {
  const DAI = useToken("DAI");
  const assetManager = useAssetManager();

  const shouldFetch = !!assetManager && DAI;

  return useSWR(
    shouldFetch ? ["useLoanableAmount", assetManager, DAI] : null,
    getLoanableAmount
  );
}
