import ABI from "@constants/abis/lendingMarket.json";
import { formatUnits } from "@ethersproject/units";
import { getMarketAddress } from "@lib/contracts/getMarketAddress";
import { getContract } from "@util/getContract";

/**
 * @name getInterest
 *
 * @param {String} tokenAddress
 * @param {String} account
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function getInterest(tokenAddress, account, signer, chainId) {
  if (!String(tokenAddress)) {
    throw new Error("`tokenAddress` is a required parameter.");
  }

  if (!String(account)) {
    throw new Error("`account` is a required parameter.");
  }

  try {
    const marketAddress = await getMarketAddress(tokenAddress, signer, chainId);

    /**
     * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
     */
    const contract = getContract(marketAddress, ABI, signer);

    /**
     * @description Calls the `calculatingInterest` function on the retreived contract
     */
    const res = await contract.calculatingInterest(account);

    return Number(formatUnits(res, 18));
  } catch (err) {
    throw err;
  }
}
