import { useWeb3React } from "@web3-react/core";
import { isAddress } from "@ethersproject/address";
import useSWR from "swr";

const fetchNFT = (account) => async (_) => {
  /**
   * Hook up to check if account has a certain contract
   *   NFT in their wallet before allowing access to the app
   */
  let accountHasNFT = true;

  if (accountHasNFT) return true;

  return false;
};

export default function useNFTGate() {
  const { account, library } = useWeb3React();

  const shouldFetch = isAddress(account) && !!library;

  const { data } = useSWR(shouldFetch ? "NFT" : null, fetchNFT(account));

  return data;
}
