import { MEMBER_MANAGER_ADDRESSES } from "@constants/";
import marketABI from "@constants/abis/lendingMarket.json";
import ABI from "@constants/abis/memberManager.json";
import { getMarketAddress } from "@lib/contracts/getMarketAddress";
import { getContract } from "@util/getContract";

const WAD = 1e18;
/**
 * @name getVouched
 *
 * @param {String} account
 * @param {String} tokenAddress
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function getVouched(account, tokenAddress, signer, chainId) {
  if (!String(account)) {
    throw new Error("`account` is a required parameter.");
  }

  if (!String(tokenAddress)) {
    throw new Error("`tokenAddress` is a required parameter.");
  }

  try {
    const marketAddress = await getMarketAddress(tokenAddress, signer, chainId);

    /**
     * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
     */
    const contract = getContract(
      MEMBER_MANAGER_ADDRESSES[chainId],
      ABI,
      signer
    );

    const marketContract = getContract(marketAddress, marketABI, signer);

    /**
     * @description Calls the `getStakerAddresses` function on the retreived contract
     */
    const addresses = await contract.getStakerAddresses(account, tokenAddress);

    let list = [];

    const promises = addresses.map(async (v, i) => {
      const res = await contract.getStakerAsset(account, v, tokenAddress);

      const isOverdue = await marketContract.checkIsOverdue(v);

      const vouched = parseFloat((res.vouch / WAD).toString());

      const used = parseFloat((res.creditUsed / WAD).toString());

      list.push({
        address: v,
        vouched,
        used,
        percentage: used / vouched,
        health: isOverdue ? (vouched - used) / vouched : 100,
      });
    });

    await Promise.all(promises);

    return list;
  } catch (err) {
    throw err;
  }
}
