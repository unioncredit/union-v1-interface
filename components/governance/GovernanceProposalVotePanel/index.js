import { commify } from "@ethersproject/units";
import Tooltip from "@reach/tooltip";
import { useWeb3React } from "@web3-react/core";
import Button from "components/button";
import { useProposalVoteModalToggle } from "components/governance/ProposalVoteModal/state";
import VoteBar from "components/governance/VoteBar";
import Skeleton from "components/Skeleton";
import useGovernanceTokenSupply from "hooks/governance/useGovernanceTokenSupply";
import useProposalQuorum from "hooks/governance/useProposalQuorum";
import useProposalVoteReceipt from "hooks/governance/useProposalVoteReceipt";
import { Fragment } from "react";
import Info from "svgs/Info";
import { toPercent } from "util/numbers";

const GovernanceProposalVotePanel = ({
  forCount,
  againstCount,
  status,
  proposalId,
}) => {
  const { account } = useWeb3React();

  const { data: voteReceipt } = useProposalVoteReceipt(account, proposalId);

  const hasVotes = Boolean(forCount >= 0 && againstCount >= 0);

  const forVotes = forCount;
  const againstVotes = againstCount;

  const totalVotes = forVotes + againstVotes;

  const forPercent =
    hasVotes && Boolean(forVotes / totalVotes) ? forVotes / totalVotes : 0;

  const againstPercent =
    hasVotes && Boolean(againstVotes / totalVotes)
      ? againstVotes / totalVotes
      : 0;

  const { data: quorum } = useProposalQuorum();

  const { data: totalSupply } = useGovernanceTokenSupply();

  const toggleProposalVoteModal = useProposalVoteModalToggle();

  const totalVotePercent = totalVotes / totalSupply;

  const quorumPercent = quorum / totalSupply;

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
              {hasVotes ? (
                `(${toPercent(forPercent)}) ${commify(forVotes.toFixed(2))}`
              ) : (
                <Fragment>
                  <Skeleton width={60} /> <Skeleton width={90} />
                </Fragment>
              )}
            </div>
          </div>

          {/* Spacer */}
          <div className="h-2" />

          <VoteBar percent={forPercent} type="For" />
        </div>

        {/* Spacer */}
        <div className="h-12" />

        <div>
          <div className="flex justify-between font-semibold text-lg">
            <div>Against</div>
            <div>
              {hasVotes ? (
                `(${toPercent(againstPercent)}) ${commify(
                  againstVotes.toFixed(2)
                )}`
              ) : (
                <Fragment>
                  <Skeleton width={60} /> <Skeleton width={90} />
                </Fragment>
              )}
            </div>
          </div>

          {/* Spacer */}
          <div className="h-2" />

          <VoteBar percent={againstPercent} type="Against" />
        </div>

        {/* Spacer */}
        <div className="h-10" />

        <div className="divider" />

        {/* Spacer */}
        <div className="h-6" />

        <div>
          <div className="flex justify-between items-start">
            <div>
              <Tooltip label="Quorum Tooltip">
                <div className="flex items-center space-x-2">
                  <div className="text-type-light leading-tight">Quorum</div>
                  <Info />
                </div>
              </Tooltip>

              {/* Spacer */}
              <div className="h-3" />

              {quorum && totalSupply ? (
                <div className="leading-tight px-1 py-2px rounded bg-quorum-pure text-quorum-light font-semibold text-sm">{`${toPercent(
                  quorumPercent
                )} needed`}</div>
              ) : (
                <div className="leading-none">
                  <Skeleton width={92} height={21} />
                </div>
              )}
            </div>
            <div className="text-lg font-semibold leading-tight">
              {hasVotes ? toPercent(totalVotePercent) : <Skeleton width={40} />}
            </div>
          </div>
        </div>

        {status === "active" && (
          <Fragment>
            {/* Spacer */}
            <div className="h-6" />

            <div className="divider" />

            {/* Spacer */}
            <div className="h-10" />

            <Button onClick={toggleProposalVoteModal} full>
              {voteReceipt?.hasVoted
                ? "Change your vote"
                : "Vote for this proposal"}
            </Button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default GovernanceProposalVotePanel;
