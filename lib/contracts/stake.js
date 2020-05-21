import { STAKING_MANAGER_ADDRESSES } from "constants/variables";
import erc20ABI from "constants/abis/erc20Detailed.json";
import ABI from "constants/abis/stakingManager.json";
import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "@ethersproject/units";
import { MaxUint256 } from "@ethersproject/constants";
import getContract from "util/getContract";

/**
 * @name stake
 *
 * @param {String} tokenAddress
 * @param {Number} amount
 * @param {import("@ethersproject/abstract-signer").Signer} signer The Web3 Provider's signer
 */
export async function stake(tokenAddress, amount, signer, chainId) {
    if (!String(tokenAddress)) {
        throw new Error("`memberAddress` is a required parameter.");
    }

    try {
        /**
         * @description Fetches the contract from the input contract address, the ABI, and the signer needed to sign the transaciton
         */
        const contract = getContract(
            STAKING_MANAGER_ADDRESSES[chainId],
            ABI,
            signer
        );

        const erc20Token = getContract(tokenAddress, erc20ABI, signer);

        const userAddress = await signer.getAddress();

        const stakeAmount = parseUnits(amount, 18);

        const res = await erc20Token.allowance(
            userAddress,
            STAKING_MANAGER_ADDRESSES[chainId]
        );

        const allowanceAmount = BigNumber.from(res);

        if (allowanceAmount.lt(stakeAmount)) {
            await erc20Token.approve(
                STAKING_MANAGER_ADDRESSES[chainId],
                MaxUint256
            );
        }

        /**
         * @description Calls the `stake` function on the retreived contract
         */
        await contract.stake(tokenAddress, stakeAmount.toString());
    } catch (err) {
        throw err;
    }
}
