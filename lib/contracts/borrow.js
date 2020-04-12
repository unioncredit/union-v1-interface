import { getContract } from "@util/getContract";
import ABI from "@constants/abis/lendingMarket.json";

import { getMarketAddress } from "@lib/contracts/getMarketAddress";

/**
 * @name borrow
 *
 * @param {String} tokenAddress
 * @param {Number} amount
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function borrow(tokenAddress, amount, signer, chainId) {
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
        const contract = await getContract(
            marketAddress,
            ABI,
            signer
        );

        /**
         * @description Calls the `borrow` function on the retreived contract
         */
        const res = await contract.borrow(amount);

        return res;
    } catch (e) {
        console.error(e.code);
        throw e;
    }
}
