import useProposalQuorum from "hooks/governance/useProposalQuorum";
import useProposalThreshold from "hooks/governance/useProposalThreshold";
import useVotingPeriod from "./useVotingPeriod";
import useVotingDelay from "./useVotingDelay";
import useTimelock from "./useTimelock";

export default function useGovernanceStats() {
  const { data: quorum } = useProposalQuorum();
  const { data: threshold } = useProposalThreshold();
  const { data: votingPeriod } = useVotingPeriod();
  const { data: votingDelay } = useVotingDelay();
  const { data: timelock } = useTimelock();

  return {
    quorum,
    threshold,
    votingPeriod,
    votingDelay,
    timelock,
  };
}
