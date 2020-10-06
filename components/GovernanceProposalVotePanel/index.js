import { commify } from "@ethersproject/units";
import Button from "components/button";
import { toPercent } from "util/numbers";

const GovernanceProposalVotePanel = ({
  id,
  forCount = 0,
  againstCount = 0,
}) => {
  const forVotes = forCount;
  const againstVotes = againstCount;

  const totalVotes = forVotes + againstVotes;

  const forPercent = id ? toPercent(forVotes / totalVotes) : toPercent(0);
  const againstPercent = id
    ? toPercent(againstVotes / totalVotes)
    : toPercent(0);

  return (
    <div className="rounded bg-white shadow-card">
      <div className="px-8 py-6 border-b">
        <h2 className="leading-tight">Votes</h2>
      </div>
      <div className="p-8">
        <div>
          <div className="flex justify-between font-semibold text-lg">
            <div>For</div>
            <div>
              ({forPercent}) {commify(forVotes.toFixed(2))}
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-12" />

        <div>
          <div className="flex justify-between font-semibold text-lg">
            <div>Against</div>
            <div>
              ({againstPercent}) {commify(againstVotes.toFixed(2))}
            </div>
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
