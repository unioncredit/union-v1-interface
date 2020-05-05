import { MEMBER_MANAGER_ADDRESSES } from "@constants/";
import marketABI from "@constants/abis/lendingMarket.json";
import ABI from "@constants/abis/memberManager.json";
import { formatUnits } from "@ethersproject/units";
import { getMarketAddress } from "@lib/contracts/getMarketAddress";
import getContract from "@util/getContract";

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

    const list = await Promise.all(
      addresses.map(async (address, i) => {
        const res = await contract.getBorrowerAsset(
          account,
          address,
          tokenAddress
        );

        const vouched = Number(formatUnits(res.vouch, 18));

        const used = Number(formatUnits(res.lending, 18));

        const percentage = parseFloat(res.lending / res.vouch);

        const isOverdue = await marketContract.checkIsOverdue(account);

        return {
          address,
          percentage,
          vouched,
          used,
          health: isOverdue ? (vouched - used) / vouched : 100,
        };
      })
    );

    return list;
  } catch (err) {
    throw err;
  }
}
