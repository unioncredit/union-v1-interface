import { MEMBER_MANAGER_ADDRESSES } from "constants/variables";
import ABI from "constants/abis/memberManager.json";
import getContract from "util/getContract";
import BigNumber from "bignumber.js/bignumber.mjs";

const WAD = 1e18;

/**
 * @name vouch
 *
 * @param {String} memberAddress
 * @param {String} tokenAddress
 * @param {Number} amount
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function vouch(
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

    const isMember = await contract.isMember(memberAddress);

    if (isMember) {
      /**
       * @description Calls the `trust` function on the retreived contract
       */
      const tx = await contract.trust(
        memberAddress,
        tokenAddress,
        trustAmount.toFixed()
      );

      await tx.wait();
    } else {
      /**
       * @description Calls the `addTrust` function on the retreived contract
       */
      const tx = await contract.addTrust(
        memberAddress,
        tokenAddress,
        trustAmount.toFixed()
      );

      await tx.wait();
    }
  } catch (err) {
    throw err;
  }
}
