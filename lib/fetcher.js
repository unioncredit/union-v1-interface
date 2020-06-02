import { getVouched } from "./contracts/getVouched";

/**
 * @name fetcher
 * @param {("vouch")} key
 */
export default (key, { account, curToken, library, chainId }) => {
  if (key === "vouch") return getVouched(account, curToken, library, chainId);

  throw new Error("Unhandled 'key'");
};
