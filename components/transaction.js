const Transaction = ({}) => {
  return (
    <div className="mt-4 bg-white border rounded p-6 flex items-center">
      <div className="h-12 w-12 rounded-full bg-border-pure" />

      <div className="flex-1 mx-4">
        <p className="mb-2 leading-none">
          <strong className="font-semibold">alex56.eth increased</strong> your
          credit limit
        </p>
        <p className="font-normal leading-none">4 Feb 2020</p>
      </div>

      <div>
        <p>650 DAI</p>
      </div>
    </div>
  );
};
export default Transaction;
