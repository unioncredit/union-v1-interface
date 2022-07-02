import { Label, EmptyState, Box, Badge } from "@unioncredit/ui";
import { ReactComponent as ExtenalInline } from "@unioncredit/ui/lib/icons/externalinline.svg";
import useUserProposalVoteHistory from "hooks/governance/useUserProposalVoteHistory";
import { Link } from "react-router-dom";

export function UserVotingHistory({ address }) {
  const { data: voteHistory } = useUserProposalVoteHistory(address);

  const votes = voteHistory?.filter((vote) => vote.receipt?.hasVoted);

  if (!votes || votes.length <= 0) {
    return <EmptyState label="No voting history" />;
  }

  return (
    <Box direction="vertical">
      {votes.map((vote, i) => (
        <Link key={i} to={`/proposals/${vote.id}`}>
          <a>
            <Box fluid justify="space-between">
              <Box align="center" mb="4px">
                <Label as="p" grey={400}>
                  {vote.title}
                </Label>
                <Label as="p" grey={400}>
                  <ExtenalInline width="24px" />
                </Label>
              </Box>
              <Badge
                color={vote.receipt.support ? "green" : "red"}
                label={vote.receipt.support ? "For" : "Against"}
              />
            </Box>
          </a>
        </Link>
      ))}
    </Box>
  );
}
