import { getContract } from "@util/getContract";
import ABI from "@constants/abis/memberManager.json";
import marketABI from "@constants/abis/lendingMarket.json";
import { MEMBER_MANAGER_ADDRESSES } from "@constants/";
import { getMarketAddress } from "@lib/contracts/getMarketAddress";

const WAD = 1e18;

/**
 * @name getTrust
 *
 * @param {String} account
 * @param {String} tokenAddress
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function getTrust(account, tokenAddress, signer, chainId) {
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
     * @description Calls the `getBorrowerAddresses` function on the retreived contract
     */
    const addresses = await contract.getBorrowerAddresses(
      account,
      tokenAddress
    );

    let list = [];
    const promises = addresses.map(async (v, i) => {
      const res = await contract.getBorrowerAsset(account, v, tokenAddress);
      const isOverdue = await marketContract.checkIsOverdue(account);
      const vouched = parseFloat((res.vouch / WAD).toString());
      const used = parseFloat((res.lending / WAD).toString());
      list.push({
        address: v,
        percentage: parseFloat(res.lending / res.vouch),
        vouched,
        used,
        health: isOverdue ? (vouched - used) / vouched : 100,
      });
    });
    await Promise.all(promises);

    return list;
  } catch (err) {
    throw err;
  }
}
