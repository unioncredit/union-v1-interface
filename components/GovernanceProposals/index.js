import GovernanceProposal from "components/GovernanceProposal";
import useAllProposalData from "hooks/governance/useAllProposalData";

const GovernanceProposals = () => {
  const { data } = useAllProposalData();

  const hasProposals = data && data.length > 0;

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
        {hasProposals &&
          data.map((proposal, i) => (
            <GovernanceProposal key={i} {...proposal} />
          ))}
      </div>
    </div>
  );
};

export default GovernanceProposals;
