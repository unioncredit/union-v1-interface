import { getBorrowTransactions } from "./contracts/getBorrowTransactions";
import { getRepayTransactions } from "./contracts/getRepayTransactions";
import { getTrust } from "./contracts/getTrust";
import { getVouched } from "./contracts/getVouched";

const getAllTransactions = async (curToken, library, chainId) => {
  const borrow = await getBorrowTransactions(
    curToken,
    library.getSigner(),
    chainId
  );

  const repay = await getRepayTransactions(
    curToken,
    library.getSigner(),
    chainId
  );

  return [...borrow, ...repay].sort((a, b) => b.blockNumber - a.blockNumber);
};

/**
 * @name fetcher
 * @param {("trust"|"vouch"|"transactions")} key
 */
export default (key, { account, curToken, library, chainId }) => {
  if (key === "trust") return getTrust(account, curToken, library, chainId);

  if (key === "vouch") return getVouched(account, curToken, library, chainId);

  if (key === "transactions")
    return getAllTransactions(curToken, library, chainId);

  throw new Error("Unhandled 'key'");
};
