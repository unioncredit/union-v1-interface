import ABI from "@constants/abis/lendingMarket.json";
import { BLOCKS_PER_YEAR } from "@constants/";
import { formatUnits } from "@ethersproject/units";
import { getMarketAddress } from "@lib/contracts/getMarketAddress";
import getContract from "@util/getContract";

/**
 * @name getBorrowed
 *
 * @param {String} tokenAddress
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function getBorrowRate(tokenAddress, signer, chainId) {
    if (!String(tokenAddress)) {
        throw new Error("`tokenAddress` is a required parameter.");
    }

    try {
        const marketAddress = await getMarketAddress(tokenAddress, signer, chainId);

        /**
         * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
         */
        const contract = getContract(marketAddress, ABI, signer);

        /**
         * @description Calls the `borrowRatePerBlock` function on the retreived contract
         */
        const res = await contract.borrowRatePerBlock();

        return Number(formatUnits(res, 18)) * BLOCKS_PER_YEAR[chainId];
    } catch (err) {
        throw err;
    }
}
