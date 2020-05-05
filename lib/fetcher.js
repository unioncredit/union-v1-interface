import { getTrust } from "./contracts/getTrust";
import { getVouched } from "./contracts/getVouched";

/**
 * @name fetcher
 * @param {("trust"|"vouch")} key
 */
export default (key, { account, curToken, library, chainId }) => {
  if (key === "trust") return getTrust(account, curToken, library, chainId);

  if (key === "vouch") return getVouched(account, curToken, library, chainId);

  throw new Error("Unhandled 'key'");
};
