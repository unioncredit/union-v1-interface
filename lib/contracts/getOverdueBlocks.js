import getContract from "util/getContract";
import ABI from "constants/abis/lendingMarket.json";

import { getMarketAddress } from "lib/contracts/getMarketAddress";

/**
 * @name getOverdueBlocks
 *
 * @param {String} tokenAddress
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function getOverdueBlocks(tokenAddress, signer, chainId) {
  if (!String(tokenAddress)) {
    throw new Error("`tokenAddress` is a required parameter.");
  }

  try {
    const marketAddress = await getMarketAddress(tokenAddress, signer, chainId);

    /**
     * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
     */
    const contract = getContract(marketAddress, ABI, signer);

    /**
     * @description Calls the `overdueBlocks` function on the retreived contract
     */
    const res = await contract.overdueBlocks();

    return parseInt(res.toString());
  } catch (err) {
    throw err;
  }
}
