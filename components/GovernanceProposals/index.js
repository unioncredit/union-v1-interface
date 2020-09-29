import GovernanceProposal from "components/GovernanceProposal";

const GovernanceProposals = () => {
  return (
    <div className="bg-white rounded border">
      <div className="px-4 sm:px-6 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <button className="px-4 py-4 font-semibold text-type-base border-b-2 border-pink-3-pure">
              All
            </button>
            <button className="px-4 py-4 font-semibold text-type-light border-b-2 border-transparent">
              Active
            </button>
            <button className="px-4 py-4 font-semibold text-type-light border-b-2 border-transparent">
              Passed
            </button>
            <button className="px-4 py-4 font-semibold text-type-light border-b-2 border-transparent">
              Failed
            </button>
            <button className="px-4 py-4 font-semibold text-type-light border-b-2 border-transparent">
              Executed
            </button>
          </div>

          <div className="flex items-center space-x-1">
            <button className="px-4 py-4 font-semibold text-pink-3-pure border-b-2 border-transparent">
              Both
            </button>
            <button className="px-4 py-4 font-semibold text-type-light border-b-2 border-transparent">
              Onchain
            </button>
            <button className="px-4 py-4 font-semibold text-type-light border-b-2 border-transparent">
              Offchain
            </button>
          </div>
        </div>

        <div className="divider -mt-px" />
      </div>

      <div className="p-2">
        {new Array(5).fill("").map((_, i) => (
          <GovernanceProposal key={i} />
        ))}
      </div>
    </div>
  );
};

export default GovernanceProposals;
