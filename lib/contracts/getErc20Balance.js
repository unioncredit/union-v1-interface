import { getContract } from "@util/getContract";
import ABI from "@constants/abis/erc20Detailed.json";

/**
 * @name getErc20Balance
 *
 * @param {String} tokenAddress
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function getErc20Balance(tokenAddress, signer, chainId) {
  if (!String(tokenAddress)) {
    throw new Error("`tokenAddress` is a required parameter.");
  }

  try {
    /**
     * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
     */
    const contract = getContract(tokenAddress, ABI, signer);

    const decimals = await contract.decimals();
    const account = await signer.getAddress();
    /**
     * @description Calls the `balanceOf` function on the retreived contract
     */
    const res = await contract.balanceOf(account);

    return parseFloat(res.toString()) / 10 ** parseFloat(decimals.toString());
  } catch (err) {
    throw err;
  }
}
