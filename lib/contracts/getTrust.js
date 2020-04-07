import { getContract } from "@util/getContract";
import ABI from "@constants/abis/memberManager.json";
import { MEMBER_MAMAGER_ADDRESSES } from "@constants/";

/**
 * @name getTrust
 *
 * @param {String} account
 * @param {String} tokenAddress
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function getTrust(account, tokenAddress, signer, chainId) {
    if (!String(account)) {
        throw new Error("`account` is a required parameter.");
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
         * @description Calls the `getGuaranteeAddresses` function on the retreived contract
         */
        const addresses = await contract.getGuaranteeAddresses(account, tokenAddress);

        let list = [];
        const promises = addresses.map(async (v, i) => {
            const res = await contract.getGuaranteeAsset(account, v, tokenAddress);
            list.push({
                address: v,
                vouched: res.vouch.toString(),
                used: res.lending.toString(),
                health: 0
            })
        });
        await Promise.all(promises);

        return list;
    } catch (e) {
        console.error(e.code);
        throw e;
    }
}
