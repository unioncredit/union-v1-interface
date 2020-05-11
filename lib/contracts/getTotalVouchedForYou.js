import { MEMBER_MANAGER_ADDRESSES } from "@constants/";
import { formatUnits } from "@ethersproject/units";
import ABI from "@constants/abis/memberManager.json";
import getContract from "@util/getContract";

/**
 * @name getTotalVouchedForYou
 *
 * @param {String} tokenAddress
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function getTotalVouchedForYou(
    tokenAddress,
    signer,
    chainId
) {
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

        const userAddress = await signer.getAddress();
        const res = await contract.getTotalCreditLimit(tokenAddress, userAddress);

        return Number(formatUnits(res, 18));
    } catch (err) {
        throw err;
    }
}
