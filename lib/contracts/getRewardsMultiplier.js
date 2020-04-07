import { getContract } from "@util/getContract";
import { STAKING_MAMAGER_ADDRESSES, SCALE } from "@constants/";
import ABI from "@constants/abis/stakingManager.json";

/**
 * @name getRewardsMultiplier
 *
 * @param {String} tokenAddress
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function getRewardsMultiplier(tokenAddress, signer, chainId) {
  try {
    /**
     * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
     */
    const contract = await getContract(
      STAKING_MAMAGER_ADDRESSES[chainId],
      ABI,
      signer
    );

    /**
     * @description Calls the `getRewardsMultiplier` function on the retreived contract
     */
    const res = await contract.getRewardsMultiplier(tokenAddress);

    return parseFloat(res.toString()) / SCALE;
  } catch (e) {
    console.error(e.code);
    throw e;
  }
}
