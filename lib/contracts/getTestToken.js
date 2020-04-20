import BigNumber from "bignumber.js/bignumber.mjs";

import { getContract } from "@util/getContract";
import ABI from "@constants/abis/faucetERC20.json";

const WAD = 1e18;

/**
 * @name getTestToken
 *
 * @param {String} tokenAddress
 * @param {Number} amount
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function getTestToken(tokenAddress, amount, signer, chainId) {
  if (!String(tokenAddress)) {
    throw new Error("`tokenAddress` is a required parameter.");
  }

  try {
    /**
     * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
     */
    const contract = await getContract(tokenAddress, ABI, signer);

    const account = await signer.getAddress();
    const mintAmount = new BigNumber(amount).times(WAD);
    /**
     * @description Calls the `mint` function on the retreived contract
     */
    await contract.mint(account, mintAmount.toFixed());
  } catch (err) {
    throw err;
  }
}
