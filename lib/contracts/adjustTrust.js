import BigNumber from "bignumber.js/bignumber.mjs";
import ABI from "constants/abis/memberManager.json";
import { MEMBER_MANAGER_ADDRESSES } from "constants/variables";
import getContract from "util/getContract";

const WAD = 1e18;

/**
 * @name adjustTrust
 *
 * @param {String} memberAddress
 * @param {String} tokenAddress
 * @param {Number} amount
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function adjustTrust(
  memberAddress,
  tokenAddress,
  amount,
  signer,
  chainId
) {
  if (!String(memberAddress)) {
    throw new Error("`memberAddress` is a required parameter.");
  }

  if (!String(tokenAddress)) {
    throw new Error("`tokenAddress` is a required parameter.");
  }

  try {
    /**
     * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
     */
    const contract = getContract(
      MEMBER_MANAGER_ADDRESSES[chainId],
      ABI,
      signer
    );

    const trustAmount = new BigNumber(amount).times(WAD);

    /**
     * @description Calls the `vouch` function on the retreived contract
     */
    let estimate;
    try {
      estimate = await contract.estimateGas.updateTrust(
        memberAddress,
        tokenAddress,
        trustAmount.toFixed()
      );
    } catch (error) {
      estimate = 300000;
    }
    return contract.updateTrust(
      memberAddress,
      tokenAddress,
      trustAmount.toFixed(),
      {
        gasLimit: estimate,
      }
    );
  } catch (err) {
    throw err;
  }
}
