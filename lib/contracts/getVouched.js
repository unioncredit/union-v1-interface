import { MEMBER_MANAGER_ADDRESSES } from "constants/variables";
import marketABI from "constants/abis/lendingMarket.json";
import ABI from "constants/abis/memberManager.json";
import { formatUnits } from "@ethersproject/units";
import { getMarketAddress } from "lib/contracts/getMarketAddress";
import getContract from "util/getContract";

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

    const list = await Promise.all(
      addresses.map(async (address) => {
        const res = await contract.getStakerAsset(
          account,
          address,
          tokenAddress
        );

        const isActive = await contract.checkAssetIsActive(
          address,
          account,
          tokenAddress
        );

        const isOverdue = await marketContract.checkIsOverdue(address);

        const vouched = Number(formatUnits(res.vouchingAmount, 18)).toFixed(2);

        const used = Number(formatUnits(res.lockedStake, 18)).toFixed(2);

        const available = Number(vouched - used).toFixed(2);

        const trust = Number(formatUnits(res.trustAmount, 18)).toFixed(2);

        const health = isOverdue ? (vouched - used) / vouched : 100;

        const percentage = used / vouched;

        return {
          address,
          vouched,
          used,
          available,
          trust,
          percentage,
          health,
          isActive,
        };
      })
    );

    return list;
  } catch (err) {
    throw err;
  }
}
