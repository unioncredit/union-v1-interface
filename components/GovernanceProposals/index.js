import GovernanceProposal from "components/GovernanceProposal";

const GovernanceProposals = () => {
  return (
    <div className="bg-white rounded border">
      <div className="px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="px-4 font-semibold text-type-base">All</button>
            <button className="px-4 font-semibold text-type-light">
              Active
            </button>
            <button className="px-4 font-semibold text-type-light">
              Passed
            </button>
            <button className="px-4 font-semibold text-type-light">
              Failed
            </button>
            <button className="px-4 font-semibold text-type-light">
              Executed
            </button>
          </div>

          <div className="flex items-center divide-x">
            <button className="px-4 font-semibold text-pink-3-pure">
              Both
            </button>
            <button className="px-4 font-semibold text-type-light">
              Onchain
            </button>
            <button className="px-4 font-semibold text-type-light">
              Offchain
            </button>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-5" />

        <div className="divider" />
      </div>

      {new Array(5).fill("").map((_, i) => (
        <GovernanceProposal key={i} />
      ))}
    </div>
  );
};

export default GovernanceProposals;
