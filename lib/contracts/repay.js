import BigNumber from "bignumber.js/bignumber.mjs";

import { getContract } from "@util/getContract";
import ABI from "@constants/abis/lendingMarket.json";
import erc20ABI from "@constants/abis/erc20Detailed.json";
import { getMarketAddress } from "@lib/contracts/getMarketAddress";

const WAD = 1e18;
/**
 * @name repay
 *
 * @param {String} tokenAddress
 * @param {Number} amount
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function repay(tokenAddress, amount, signer, chainId) {
  if (!String(tokenAddress)) {
    throw new Error("`tokenAddress` is a required parameter.");
  }

  if (amount <= 0) {
    throw new Error("`amount` is a required parameter.");
  }

  try {
    const marketAddress = await getMarketAddress(tokenAddress, signer, chainId);

    /**
     * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
     */
    const contract = await getContract(marketAddress, ABI, signer);

    const erc20Token = await getContract(tokenAddress, erc20ABI, signer);

    const userAddress = await signer.getAddress();
    const repayAmount = new BigNumber(amount).times(WAD);
    const res = await erc20Token.allowance(userAddress, marketAddress);
    const allowanceAmount = new BigNumber(res.toString());
    if (allowanceAmount.lt(repayAmount)) {
      const tx = await erc20Token.approve(marketAddress, repayAmount.toFixed());

      await tx.wait();
    }

    /**
     * @description Calls the `repay` function on the retreived contract
     */
    await contract.repay(repayAmount.toFixed());
  } catch (err) {
    throw err;
  }
}
