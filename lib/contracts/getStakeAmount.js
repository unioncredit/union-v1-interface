import { getContract } from "@util/getContract";
import { STAKING_MAMAGER_ADDRESSES } from "@constants/";
import ABI from "@constants/abis/stakingManager.json";

const WAD = 1e18;

/**
 * @name getStakeAmount
 *
 * @param {String} account
 * @param {String} tokenAddress
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function getStakeAmount(account, tokenAddress, signer, chainId) {
  if (!String(tokenAddress)) {
    throw new Error("`memberAddress` is a required parameter.");
  }

  try {
    /**
     * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
     */
    const contract = await getContract(
      STAKING_MAMAGER_ADDRESSES[chainId],
      ABI,
      signer
    );

    /**
     * @description Calls the `getMarkets` function on the retreived contract
     */
    let res = await contract.getStakerBalance(account, tokenAddress);
    res.stakingAmount = parseFloat((res.stakingAmount / WAD).toString());
    res.creditUsed = parseFloat((res.creditUsed / WAD).toString());
    res.freezeAmount = parseFloat((res.freezeAmount / WAD).toString());
    res.vouchingAmount = parseFloat((res.vouchingAmount / WAD).toString());

    return res;
  } catch (e) {
    console.error(e.code);
    throw e;
  }
}
