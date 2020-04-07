import { getContract } from "@util/getContract";
import { STAKING_MAMAGER_ADDRESSES } from "@constants/";
import ABI from "@constants/abis/stakingManager.json";

/**
 * @name stake
 *
 * @param {String} tokenAddress
 * @param {Number} amount
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function stake(tokenAddress, amount, signer, chainId) {
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
         * @description Calls the `stake` function on the retreived contract
         */
        await contract.stake(tokenAddress, amount);
    } catch (e) {
        console.error(e.code);
        throw e;
    }
}
