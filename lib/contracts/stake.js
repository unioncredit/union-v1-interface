import BigNumber from "bignumber.js/bignumber.mjs";

import { getContract } from "@util/getContract";
import { STAKING_MAMAGER_ADDRESSES } from "@constants/";
import ABI from "@constants/abis/stakingManager.json";
import erc20ABI from "@constants/abis/erc20Detailed.json";

const WAD = 1e18;
/**
 * @name stake
 *
 * @param {String} tokenAddress
 * @param {Number} amount
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function stake(tokenAddress, amount, signer, chainId) {
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

    const erc20Token = await getContract(
      tokenAddress,
      erc20ABI,
      signer
    );

    const userAddress = await signer.getAddress();
    const stakeAmount = new BigNumber(amount).times(WAD);
    const res = await erc20Token.allowance(userAddress, STAKING_MAMAGER_ADDRESSES[chainId]);
    const allowanceAmount = new BigNumber(res.toString());
    if (allowanceAmount.lt(stakeAmount)) {
      await erc20Token.approve(STAKING_MAMAGER_ADDRESSES[chainId], stakeAmount.toFixed());
    }

    /**
     * @description Calls the `stake` function on the retreived contract
     */
    await contract.stake(tokenAddress, stakeAmount.toFixed());
  } catch (e) {
    console.error(e.code);
    throw e;
  }
}
