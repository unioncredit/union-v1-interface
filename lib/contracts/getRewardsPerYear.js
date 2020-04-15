import { getContract } from "@util/getContract";
import { STAKING_MAMAGER_ADDRESSES } from "@constants/";
import ABI from "@constants/abis/stakingManager.json";

const WAD = 1e18;

/**
 * @name getRewardsPerYear
 *
 * @param {String} tokenAddress
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function getRewardsPerYear(tokenAddress, signer, chainId) {
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
         * @description Calls the `rewardsPerYearEst` function on the retreived contract
         */
        const res = await contract.rewardsPerYearEst(tokenAddress);

        return parseFloat((res / WAD).toString());
    } catch (e) {
        console.error(e.code);
        throw e;
    }
}
