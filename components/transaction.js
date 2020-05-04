const TRANSACTION_TYPES = {
  BORROW: "You borrowed",
  REPAY: "You repayed",
};

const Transaction = ({ data }) => {
  return (
    <div className="mt-4 bg-white border rounded p-6 flex items-center">
      <div className="h-12 w-12 rounded-full bg-border-pure" />

      <div className="flex-1 mx-4">
        <p className="mb-2 leading-none">
          <strong className="font-semibold">
            {TRANSACTION_TYPES[data.type]}
          </strong>{" "}
          part of your credit
        </p>
        <p className="font-normal leading-none">{data.date}</p>
      </div>

      <div>
        <p>{data.amount.toFixed(2)} DAI</p>
      </div>
    </div>
  );
};
export default Transaction;
