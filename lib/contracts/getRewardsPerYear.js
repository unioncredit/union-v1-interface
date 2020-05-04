import { getContract } from "@util/getContract";
import { UNION_TOKEN_ADDRESSES, BLOCKS_PER_YEAR } from "@constants/";
import ABI from "@constants/abis/unionToken.json";

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
      UNION_TOKEN_ADDRESSES[chainId],
      ABI,
      signer
    );

    const userAddress = await signer.getAddress();

    const userBlockDelta = await contract.getUserBlockDelta(
      userAddress,
      tokenAddress
    );
    let blocks;
    if (userBlockDelta > BLOCKS_PER_YEAR[chainId]) {
      blocks = userBlockDelta;
    } else {
      blocks = BLOCKS_PER_YEAR[chainId] - userBlockDelta;
    }

    /**
     * @description Calls the `calculateRewardsByBlocks` function on the retreived contract
     */
    const res = await contract.calculateRewardsByBlocks(
      userAddress,
      tokenAddress,
      blocks
    );

    return parseFloat((res / WAD).toString());
  } catch (e) {
    console.error(e.code);
    throw e;
  }
}
