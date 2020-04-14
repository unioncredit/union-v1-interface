import { getContract } from "@util/getContract";
import ABI from "@constants/abis/memberManager.json";
import marketABI from "@constants/abis/lendingMarket.json";
import { MEMBER_MAMAGER_ADDRESSES } from "@constants/";
import { getMarketAddress } from "@lib/contracts/getMarketAddress";

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
    const contract = await getContract(
      MEMBER_MAMAGER_ADDRESSES[chainId],
      ABI,
      signer
    );

    const marketContract = await getContract(marketAddress, marketABI, signer);

    /**
     * @description Calls the `getBackerAddresses` function on the retreived contract
     */
    const addresses = await contract.getBackerAddresses(account, tokenAddress);

    let list = [];
    const promises = addresses.map(async (v, i) => {
      const res = await contract.getBackerAsset(account, v, tokenAddress);
      const isOverdue = await marketContract.checkIsOverdue(account);
      const vouched = parseFloat((res.vouch / WAD).toString());
      const used = parseFloat((res.lending / WAD).toString());
      list.push({
        address: v,
        percentage: parseFloat((res.lending / res.vouch)),
        vouched,
        used,
        health: isOverdue ? ((vouched - used) / vouched) : 100,
      });
    });
    await Promise.all(promises);

    return list;
  } catch (e) {
    console.error(e.code);
    throw e;
  }
}
