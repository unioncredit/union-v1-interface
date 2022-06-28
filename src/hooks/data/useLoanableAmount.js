import useSWR from "swr";
import useToken from "hooks/useToken";
import useAssetManager from "hooks/contracts/useAssetManager";

function getLoanableAmount(assetManager) {
  return function (_, tokenAddress) {
    return assetManager.getLoanableAmount(tokenAddress);
  };
}

export default function useLoanableAmount() {
  const DAI = useToken("DAI");
  const assetManager = useAssetManager();

  const shouldFetch = !!assetManager && DAI;

  return useSWR(
    shouldFetch ? ["useLoanableAmount", DAI] : null,
    getLoanableAmount(assetManager)
  );
}
