import getContract from "util/getContract";
import { MARKET_REGISTRY_ADDRESSES } from "constants/variables";
import ABI from "constants/abis/marketRegistry.json";

/**
 * @name getAllMarkets
 *
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function getAllMarkets(signer, chainId) {
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
     * @description Calls the `getMarkets` function on the retreived contract
     */
    const res = await contract.getMarkets();

    return res;
  } catch (err) {
    throw err;
  }
}
