import { getContract } from "@util/getContract";
import { UNION_TOKEN_ADDRESSES } from "@constants/";
import ABI from "@constants/abis/unionToken.json";

/**
 * @name withdrawRewards
 *
 * @param {String} tokenAddress
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function withdrawRewards(tokenAddress, signer, chainId) {
  if (!String(tokenAddress)) {
    throw new Error("`memberAddress` is a required parameter.");
  }

  try {
    /**
     * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
     */
    const contract = await getContract(
      UNION_TOKEN_ADDRESSES[chainId],
      ABI,
      signer
    );

    const userAddress = await signer.getAddress();

    /**
     * @description Calls the `withdrawRewards` function on the retreived contract
     */
    await contract.withdrawRewards(userAddress, tokenAddress, {
      gasLimit: 750000
    });
  } catch (err) {
    throw err;
  }
}
