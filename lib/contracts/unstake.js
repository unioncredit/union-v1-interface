import BigNumber from "bignumber.js/bignumber.mjs";

import { getContract } from "@util/getContract";
import { STAKING_MAMAGER_ADDRESSES } from "@constants/";
import ABI from "@constants/abis/stakingManager.json";

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
    const contract = await getContract(
      STAKING_MAMAGER_ADDRESSES[chainId],
      ABI,
      signer
    );

    const unstakeAmount = new BigNumber(amount).times(WAD);

    /**
     * @description Calls the `stake` function on the retreived contract
     */
    await contract.unstake(tokenAddress, unstakeAmount.toFixed());
  } catch (e) {
    console.error(e.code);
    throw e;
  }
}
