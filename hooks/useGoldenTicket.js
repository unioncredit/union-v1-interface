import { useWeb3React } from "@web3-react/core";
import { isAddress } from "@ethersproject/address";
import useSWR from "swr";

const hasGoldenTicket = (account) => async (_) => {
  /**
   * Hook up to check if account has a certain contract
   *   NFT in their wallet before allowing access to the app
   */
  let accountHasNFT = false;

  if (accountHasNFT) return true;

  return false;
};

export default function useGoldenTicket() {
  const { account, library } = useWeb3React();

  const shouldFetch = isAddress(account) && !!library;

  const { data } = useSWR(
    shouldFetch ? "GoldenTicket" : null,
    hasGoldenTicket(account)
  );

  return data;
}
