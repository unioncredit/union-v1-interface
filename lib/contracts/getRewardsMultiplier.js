import { STAKING_MANAGER_ADDRESSES } from "@constants/";
import ABI from "@constants/abis/stakingManager.json";
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
    const contract = await getContract(
      STAKING_MANAGER_ADDRESSES[chainId],
      ABI,
      signer
    );

    /**
     * @description Calls the `getRewardsMultiplier` function on the retreived contract
     */
    const res = await contract.getRewardsMultiplier(tokenAddress);

    return formatUnits(res, 18);
  } catch (err) {
    throw err;
  }
}
