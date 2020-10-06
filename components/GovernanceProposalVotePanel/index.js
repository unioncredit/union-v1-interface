import { commify } from "@ethersproject/units";
import Button from "components/button";
import useProposalQuorum from "hooks/governance/useProposalQuorum";
import { toPercent } from "util/numbers";

const GovernanceProposalVotePanel = ({
  id,
  forCount = 0,
  againstCount = 0,
}) => {
  const forVotes = forCount;
  const againstVotes = againstCount;

  const totalVotes = forVotes + againstVotes;

  const forPercent = id ? forVotes / totalVotes : 0;
  const againstPercent = id ? againstVotes / totalVotes : 0;

  const { data: quorum = 0 } = useProposalQuorum();

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
              ({toPercent(forPercent)}) {commify(forVotes.toFixed(2))}
            </div>
          </div>

          {/* Spacer */}
          <div className="h-2" />

          <div className="h-1 relative rounded-full w-full bg-passed-pure bg-opacity-25">
            <div
              className="h-1 absolute rounded-full bg-passed-pure"
              style={{ width: `calc(${forPercent} * 100%)` }}
            />
          </div>
        </div>

        {/* Spacer */}
        <div className="h-12" />

        <div>
          <div className="flex justify-between font-semibold text-lg">
            <div>Against</div>
            <div>
              ({toPercent(againstPercent)}) {commify(againstVotes.toFixed(2))}
            </div>
          </div>

          {/* Spacer */}
          <div className="h-2" />

          <div className="h-1 relative rounded-full w-full bg-against-pure bg-opacity-25">
            <div
              className="h-1 absolute rounded-full bg-against-pure"
              style={{ width: `calc(${againstPercent} * 100%)` }}
            />
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
            <div className="font-semibold">{commify(quorum)}</div>
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
