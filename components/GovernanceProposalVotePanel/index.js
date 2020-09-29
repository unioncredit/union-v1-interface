const { default: Button } = require("components/button");

const GovernanceProposalVotePanel = () => {
  return (
    <div className="rounded bg-white shadow-card">
      <div className="px-8 py-6 border-b">
        <h2 className="leading-tight">Votes</h2>
      </div>
      <div className="p-8">
        <div>
          <div className="flex justify-between font-semibold text-lg">
            <div>For</div>
            <div>(89%) 757,203</div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-12" />

        <div>
          <div className="flex justify-between font-semibold text-lg">
            <div>Against</div>
            <div>(11%) 58,103</div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-10" />

        <div className="divider" />

        {/* Spacer */}
        <div className="h-6" />

        <div>
          <div className="flex justify-between">
            <div className="text-type-light">Quorum</div>
            <div className="font-semibold">19%</div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-6" />

        <div className="divider" />

        {/* Spacer */}
        <div className="h-10" />

        <Button full>Vote for this proposal</Button>
      </div>
    </div>
  );
};

export default GovernanceProposalVotePanel;
