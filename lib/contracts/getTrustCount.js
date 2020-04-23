import { getContract } from "@util/getContract";
import ABI from "@constants/abis/memberManager.json";
import { MEMBER_MANAGER_ADDRESSES } from "@constants/";

/**
 * @name getTrustCount
 *
 * @param {String} account
 * @param {String} tokenAddress
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function getTrustCount(account, tokenAddress, signer, chainId) {
  if (!String(account)) {
    throw new Error("`account` is a required parameter.");
  }

  if (!String(tokenAddress)) {
    throw new Error("`tokenAddress` is a required parameter.");
  }

  try {
    /**
     * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
     */
    const contract = await getContract(
      MEMBER_MANAGER_ADDRESSES[chainId],
      ABI,
      signer
    );

    /**
     * @description Calls the `trustList` function on the retreived contract
     */
    const res = await contract.trustList(account, tokenAddress);
    return parseInt(res.toString());
  } catch (err) {
    throw err;
  }
}
