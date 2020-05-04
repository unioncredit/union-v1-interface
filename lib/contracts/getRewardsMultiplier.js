import { UNION_TOKEN_ADDRESSES, SCALE } from "@constants/";
import ABI from "@constants/abis/unionToken.json";
import { formatUnits } from "@ethersproject/units";
import { getContract } from "@util/getContract";

/**
 * @name getRewardsMultiplier
 *
 * @param {String} tokenAddress
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function getRewardsMultiplier(tokenAddress, signer, chainId) {
  if (!String(tokenAddress)) {
    throw new Error("`memberAddress` is a required parameter.");
  }

  try {
    /**
     * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
     */
    const contract = getContract(UNION_TOKEN_ADDRESSES[chainId], ABI, signer);

    const userAddress = await signer.getAddress();

    /**
     * @description Calls the `getRewardsMultiplier` function on the retreived contract
     */
    const res = await contract.getRewardsMultiplier(userAddress, tokenAddress);

    return formatUnits(res, 18);
  } catch (err) {
    throw err;
  }
}
