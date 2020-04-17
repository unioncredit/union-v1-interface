import { getContract } from "@util/getContract";
import ABI from "@constants/abis/lendingMarket.json";
import { getMarketAddress } from "@lib/contracts/getMarketAddress";

const WAD = 1e18;

/**
 * @name getOriginationFee
 *
 * @param {String} tokenAddress
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function getOriginationFee(tokenAddress, signer, chainId) {
    if (!String(tokenAddress)) {
        throw new Error("`memberAddress` is a required parameter.");
    }

    try {
        const marketAddress = await getMarketAddress(tokenAddress, signer, chainId);

        /**
         * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
         */
        const contract = await getContract(marketAddress, ABI, signer);

        /**
         * @description Calls the `originationFee` function on the retreived contract
         */
        const res = await contract.originationFee();

        return parseFloat(res / WAD);
    } catch (err) {
        throw err;
    }
}
