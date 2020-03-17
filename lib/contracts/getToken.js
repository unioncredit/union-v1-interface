import { getContract } from "@util/getContract";
import { CONTRACT_ADDRESSES } from "@constants/";

/**
 * @todo Replace with imported ABI from "@constants/abis/ABI-NAME.json"
 */
const ABI = {};

/**
 * @name getToken
 *
 * @param {String} tokenId
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function getToken(tokenId, signer, chainId) {
  if (!String(tokenId)) {
    throw new Error("`tokenId` is a required parameter.");
  }

  try {
    /**
     * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
     */
    const contract = await getContract(
      CONTRACT_ADDRESSES[chainId],
      ABI,
      signer
    );

    /**
     * @description Calls the `getToken` function on the retreived contract
     */
    const res = await contract.getToken(tokenId);

    return res;
  } catch (e) {
    console.error(e.code);
    throw e;
  }
}
