import { getContract } from "@util/getContract";
import ABI from "@constants/abis/memberManager.json";
import { MEMBER_MAMAGER_ADDRESSES } from "@constants/";

/**
 * @name addTrust
 *
 * @param {String} account
 * @param {String} tokenAddress
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function addTrust(account, tokenAddress, signer, chainId) {
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
      MEMBER_MAMAGER_ADDRESSES[chainId],
      ABI,
      signer
    );

    /**
     * @description Calls the `addTrust` function on the retreived contract
     */
    await contract.addTrust(account, tokenAddress);
  } catch (err) {
    throw err;
  }
}
