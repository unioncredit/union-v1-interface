import BigNumber from "bignumber.js/bignumber.mjs";
import getContract from "util/getContract";
import ABI from "constants/abis/memberManager.json";
import unionABI from "constants/abis/unionToken.json";
import {
  MEMBER_MANAGER_ADDRESSES,
  UNION_TOKEN_ADDRESSES,
} from "constants/variables";

/**
 * @name applyMember
 *
 * @param {String} account
 * @param {String} tokenAddress
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function applyMember(account, tokenAddress, signer, chainId) {
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
    const contract = getContract(
      MEMBER_MANAGER_ADDRESSES[chainId],
      ABI,
      signer
    );

    const unionContract = getContract(
      UNION_TOKEN_ADDRESSES[chainId],
      unionABI,
      signer
    );

    const feeRes = await contract.newMemberFee();
    const fee = new BigNumber(feeRes.toString());
    const userAddress = await signer.getAddress();

    const allowanceRes = await unionContract.allowance(
      userAddress,
      MEMBER_MANAGER_ADDRESSES[chainId]
    );
    const allowanceAmount = new BigNumber(allowanceRes.toString());
    if (allowanceAmount.lt(fee)) {
      const tx = await unionContract.approve(
        MEMBER_MANAGER_ADDRESSES[chainId],
        fee.toFixed()
      );
      await tx.wait();
    }

    /**
     * @description Calls the `applyMember` function on the retreived contract
     */
    const tx = await contract.applyMember(account, tokenAddress, {
      gasLimit: 2000000,
    });

    await tx.wait();
  } catch (err) {
    throw err;
  }
}
