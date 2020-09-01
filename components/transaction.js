import { useWeb3React } from "@web3-react/core";
import Tx from "svgs/Tx";
import getEtherscanLink from "util/getEtherscanLink";
import Skeleton from "./Skeleton";

const TRANSACTION_TYPES = {
  BORROW: "You borrowed",
  REPAY: "You repaid",
};

const TRANSACTION_TYPES_SHORT = {
  BORROW: "Borrow",
  REPAY: "Repay",
};

const Transaction = ({ amount, date, dateShort, hash, type }) => {
  const { chainId } = useWeb3React();

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={getEtherscanLink(chainId, hash, "TRANSACTION")}
      className="mt-4 bg-white border rounded p-4 sm:p-6 flex items-center focus:shadow-outline focus:outline-none hover:bg-border-light focus:bg-border-light transition-colors duration-150"
    >
      <Tx />

      <div className="flex-1 mx-4">
        <p className="hidden sm:block mb-2 leading-none">
          <strong className="font-semibold">{TRANSACTION_TYPES[type]}</strong>{" "}
          part of your credit
        </p>

        <p className="block sm:hidden mb-2 leading-none">
          <strong className="font-semibold capitalize">
            {TRANSACTION_TYPES_SHORT[type]}
          </strong>{" "}
        </p>

        <p className="hidden sm:block font-medium text-type-light leading-none">
          {date}
        </p>
        <p className="block sm:hidden font-medium text-type-light leading-none">
          {dateShort}
        </p>
      </div>

      <div>
        <p>{amount.toFixed(2)} DAI</p>
      </div>
    </a>
  );
};

export default Transaction;

export const TransactionSkeleton = () => (
  <div className="mt-4 bg-white border rounded p-4 sm:p-6 flex items-center focus:shadow-outline focus:outline-none hover:bg-border-light transition-colors duration-150">
    <Skeleton circle width={48} height={48} style={{ display: "block" }} />

    <div className="flex-1 mx-4">
      <p className="hidden sm:block mb-2 leading-none">
        <Skeleton width={252} />
      </p>
      <p className="block sm:hidden mb-2 leading-none">
        <Skeleton width={52} />
      </p>
      <p className="hidden sm:block font-medium text-type-light leading-none">
        <Skeleton width={160} />
      </p>
      <p className="block sm:hidden font-medium text-type-light leading-none">
        <Skeleton width={70} />
      </p>
    </div>

    <div>
      <p>
        <Skeleton width={72} />
      </p>
    </div>
  </div>
);
