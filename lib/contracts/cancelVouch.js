import { MEMBER_MANAGER_ADDRESSES } from "constants/variables";
import ABI from "constants/abis/memberManager.json";
import getContract from "util/getContract";
import BigNumber from "bignumber.js/bignumber.mjs";

const WAD = 1e18;

/**
 * @name vouch
 *
 * @param {String} staker
 * @param {String} borrower
 * @param {String} tokenAddress
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function cancelVouch(
    staker,
    borrower,
    tokenAddress,
    signer,
    chainId
) {
    if (!String(staker) || !String(borrower)) {
        throw new Error("`memberAddress` is a required parameter.");
    }

    if (!String(tokenAddress)) {
        throw new Error("`tokenAddress` is a required parameter.");
    }

    try {
        /**
         * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
         */
        const contract = getContract(
            MEMBER_MANAGER_ADDRESSES[chainId],
            ABI,
            signer
        );

        /**
         * @description Calls the `cancelVouch` function on the retreived contract
         */
        const tx = await contract.cancelVouch(staker, borrower, tokenAddress, {
            gasLimit: 200000,
        });

        await tx.wait();
    } catch (err) {
        throw err;
    }
}
