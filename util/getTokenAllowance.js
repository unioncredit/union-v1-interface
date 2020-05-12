import ABI from "constants/abis/erc20Detailed.json";
import { isAddress } from "@ethersproject/address";
import getContract from "util/getContract";

export default async function getTokenAllowance(
  address,
  tokenAddress,
  spenderAddress,
  library
) {
  if (
    !isAddress(address) ||
    !isAddress(tokenAddress) ||
    !isAddress(spenderAddress)
  ) {
    throw Error(
      "Invalid 'address' or 'tokenAddress' or 'spenderAddress' parameter" +
        `'${address}' or '${tokenAddress}' or '${spenderAddress}'.`
    );
  }

  return getContract(tokenAddress, ABI, library).allowance(
    address,
    spenderAddress
  );
}
