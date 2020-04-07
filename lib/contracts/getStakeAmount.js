import { getContract } from "@util/getContract";
import { STAKING_MAMAGER_ADDRESSES } from "@constants/";
import ABI from "@constants/abis/stakingManager.json";

/**
 * @name getStakeAmount
 *
 * @param {String} account
 * @param {String} tokenAddress
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function getStakeAmount(account, tokenAddress, signer, chainId) {
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
         * @description Calls the `getMarkets` function on the retreived contract
         */
        const res = await contract.getStakerBalance(account, tokenAddress);

        return res;
    } catch (e) {
        console.error(e.code);
        throw e;
    }
}
