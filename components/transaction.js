import { useWeb3React } from "@web3-react/core";
import Tx from "svgs/Tx";
import getEtherscanLink from "util/getEtherscanLink";

const TRANSACTION_TYPES = {
  BORROW: "You borrowed",
  REPAY: "You repayed",
};

const TRANSACTION_TYPES_SHORT = {
  BORROW: "Borrow",
  REPAY: "Repay",
};

const Transaction = ({
  account,
  amount,
  blocknumber,
  date,
  dateShort,
  fee,
  hash,
  type,
}) => {
  const { chainId } = useWeb3React();

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={getEtherscanLink(chainId, hash, "TRANSACTION")}
      className="mt-4 bg-white border rounded p-4 sm:p-6 flex items-center focus:shadow-outline focus:outline-none hover:bg-border-light transition-colors duration-150"
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

        <p className="hidden sm:block font-normal leading-none">{date}</p>
        <p className="block sm:hidden font-normal leading-none">{dateShort}</p>
      </div>

      <div>
        <p>{amount.toFixed(2)} DAI</p>
      </div>
    </a>
  );
};
export default Transaction;
