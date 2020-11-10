import { Fragment } from "react";
import createArray from "util/createArray";
import Transaction, { TransactionSkeleton } from "../Transaction";

/**
 * @name TransactionList
 *
 * @param {object} props
 * @param {array} props.data The array of transactions from the 'useTransactions' hook
 * @param {number} props.count The number of TransactionSkeletons to show while loading
 */
const TransactionList = ({ data, count = 5 }) => {
  const hasTransactions = data && data.length > 0;

  return (
    <Fragment>
      <div className="mb-4">
        <h2 className="h-12 leading-12">Transactions</h2>
      </div>

      {data
        ? hasTransactions
          ? data.map((tx, i) => <Transaction key={i} {...tx} />)
          : null
        : createArray(count).map((_, i) => <TransactionSkeleton key={i} />)}
    </Fragment>
  );
};

export default TransactionList;
