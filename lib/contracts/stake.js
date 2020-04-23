import { STAKING_MAMAGER_ADDRESSES } from "@constants/";
import erc20ABI from "@constants/abis/erc20Detailed.json";
import ABI from "@constants/abis/stakingManager.json";
import { getContract } from "@util/getContract";
import BigNumber from "bignumber.js/bignumber.mjs";

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
    const contract = getContract(
      STAKING_MAMAGER_ADDRESSES[chainId],
      ABI,
      signer
    );

    const erc20Token = getContract(tokenAddress, erc20ABI, signer);

    const userAddress = await signer.getAddress();

    const stakeAmount = new BigNumber(amount).times(WAD);

    const res = await erc20Token.allowance(
      userAddress,
      STAKING_MAMAGER_ADDRESSES[chainId]
    );

    const allowanceAmount = new BigNumber(res.toString());

    if (allowanceAmount.lt(stakeAmount)) {
      const tx = await erc20Token.approve(
        STAKING_MAMAGER_ADDRESSES[chainId],
        stakeAmount.toFixed()
      );

      await tx.wait();
    }

    /**
     * @description Calls the `stake` function on the retreived contract
     */
    await contract.stake(tokenAddress, stakeAmount.toFixed());
  } catch (err) {
    throw err;
  }
}
