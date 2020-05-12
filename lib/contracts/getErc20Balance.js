import ABI from "constants/abis/erc20Detailed.json";
import { parseUnits } from "@ethersproject/units";
import getContract from "util/getContract";

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

    return Number(parseUnits(res, decimals));
  } catch (err) {
    throw err;
  }
}
