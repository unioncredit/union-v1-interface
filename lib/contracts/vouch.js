import { getContract } from "@util/getContract";
import ABI from "@constants/abis/memberManager.json";
import { MEMBER_MAMAGER_ADDRESSES } from "@constants/";

/**
 * @name vouch
 *
 * @param {String} memberAddress
 * @param {String} tokenAddress
 * @param {Number} amount
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function vouch(memberAddress, tokenAddress, amount, signer, chainId) {
    if (!String(memberAddress)) {
        throw new Error("`memberAddress` is a required parameter.");
    }

    if (!String(tokenAddress)) {
        throw new Error("`tokenAddress` is a required parameter.");
    }

    try {
        /**
         * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
         */
        const contract = await getContract(
            MEMBER_MAMAGER_ADDRESSES[chainId],
            ABI,
            signer
        );

        /**
         * @description Calls the `vouch` function on the retreived contract
         */
        await contract.vouch(memberAddress, tokenAddress, amount);
    } catch (e) {
        console.error(e.code);
        throw e;
    }
}
