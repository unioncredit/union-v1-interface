import { getTrust } from "./contracts/getTrust";

/**
 * @name fetcher
 * @param {("trust")} key
 */
export default (key, { account, curToken, library, chainId }) => {
  if (key === "trust") return getTrust(account, curToken, library, chainId);
};
