import ABI from "constants/abis/erc20Detailed.json";
import { isAddress } from "@ethersproject/address";
import getContract from "util/getContract";

export const ERROR_CODES = [
  "TOKEN_NAME",
  "TOKEN_SYMBOL",
  "TOKEN_DECIMALS",
].reduce((accumulator, currentValue, currentIndex) => {
  accumulator[currentValue] = currentIndex;
  return accumulator;
}, {});

export default async function getTokenDecimals(tokenAddress, library) {
  if (!isAddress(tokenAddress)) {
    throw Error(`Invalid 'tokenAddress' parameter '${tokenAddress}'.`);
  }

  return getContract(tokenAddress, ABI, library)
    .decimals()
    .catch((error) => {
      error.code = ERROR_CODES.TOKEN_DECIMALS;
      throw error;
    });
}
