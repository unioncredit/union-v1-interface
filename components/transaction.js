const Transaction = ({ data }) => {
  return (
    <div className="mt-4 bg-white border rounded p-6 flex items-center">
      <div className="h-12 w-12 rounded-full bg-border-pure" />

      <div className="flex-1 mx-4">
        <p className="mb-2 leading-none">
          <strong className="font-semibold">{data.type}</strong>
        </p>
        <p className="font-normal leading-none">{data.date}</p>
      </div>

      <div>
        <p>{data.amount.toFixed(4)} DAI</p>
      </div>
    </div>
  );
};
export default Transaction;
