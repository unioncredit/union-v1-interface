import BigNumber from "bignumber.js/bignumber.mjs";

import { getContract } from "@util/getContract";
import ABI from "@constants/abis/memberManager.json";
import { MEMBER_MAMAGER_ADDRESSES } from "@constants/";

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
    const contract = await getContract(
      MEMBER_MAMAGER_ADDRESSES[chainId],
      ABI,
      signer
    );

    const vouchAmount = new BigNumber(amount).times(WAD);

    const isMember = await contract.isMember(memberAddress);
    if (isMember) {
      /**
       * @description Calls the `vouch` function on the retreived contract
       */
      await contract.vouch(memberAddress, tokenAddress, vouchAmount.toFixed());
    } else {
      /**
       * @description Calls the `addTrust` function on the retreived contract
       */
      await contract.addTrust(memberAddress, tokenAddress, vouchAmount.toFixed());
    }
  } catch (err) {
    throw err;
  }
}
