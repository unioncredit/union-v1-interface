import { STAKING_MANAGER_ADDRESSES } from "constants/variables";
import ABI from "constants/abis/stakingManager.json";
import getContract from "util/getContract";
import BigNumber from "bignumber.js/bignumber.mjs";

const WAD = 1e18;

/**
 * @name stake
 *
 * @param {String} tokenAddress
 * @param {Number} amount
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function unstake(tokenAddress, amount, signer, chainId) {
  if (!String(tokenAddress)) {
    throw new Error("`memberAddress` is a required parameter.");
  }

  try {
    /**
     * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
     */
    const contract = getContract(
      STAKING_MANAGER_ADDRESSES[chainId],
      ABI,
      signer
    );

    const unstakeAmount = new BigNumber(amount).times(WAD);

    /**
     * @description Calls the `stake` function on the retreived contract
     */
    await contract.unstake(tokenAddress, unstakeAmount.toFixed());
  } catch (err) {
    throw err;
  }
}
