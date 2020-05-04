import { getContract } from "@util/getContract";
import { MARKET_REGISTRY_ADDRESSES } from "@constants/";
import ABI from "@constants/abis/marketRegistry.json";

/**
 * @name getMarketAddress
 *
 * @param {String} tokenAddress
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function getMarketAddress(tokenAddress, signer, chainId) {
  if (!String(tokenAddress)) {
    throw new Error("`tokenAddress` is a required parameter.");
  }

  try {
    /**
     * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
     */
    const contract = getContract(
      MARKET_REGISTRY_ADDRESSES[chainId],
      ABI,
      signer
    );

    /**
     * @description Calls the `tokens` function on the retreived contract
     */
    const res = await contract.tokens(tokenAddress);

    return res;
  } catch (err) {
    throw err;
  }
}
