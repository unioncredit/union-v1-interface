import ABI from "@constants/abis/erc20Detailed.json";
import { isAddress } from "@ethersproject/address";
import getContract from "@util/getContract";

export default async function getTokenBalance(tokenAddress, address, library) {
  if (!isAddress(tokenAddress) || !isAddress(address)) {
    throw Error(
      `Invalid 'tokenAddress' or 'address' parameter '${tokenAddress}' or '${address}'.`
    );
  }

  return getContract(tokenAddress, ABI, library).balanceOf(address);
}
