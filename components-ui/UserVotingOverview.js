import PropTypes from "prop-types";
import {
  VoteDelegationModal,
  useVoteDelegationModal,
} from "components-ui/modals";
import { Card, Box, Button, Divider, Text, Label, Heading } from "union-ui";
import { commify } from "@ethersproject/units";
import useVotingWalletData from "hooks/governance/useVotingWalletData";
import useUnionSymbol from "hooks/useUnionSymbol";
import useUserGovernanceTokenRewards from "hooks/governance/useUserGovernanceTokenRewards";

export function UserVotingOverview({ variant, address }) {
  const { isOpen: isVoteDelegationOpen, open: openVoteDelegationModal } =
    useVoteDelegationModal();

  const { data: votingWalletData } = useVotingWalletData(address);
  const {
    balanceOf = 0,
    currentVotes = 0,
    delegates,
  } = !!votingWalletData && votingWalletData;

  const { data: unionSymbol } = useUnionSymbol();
  const { data: unclaimedBalance = 0 } = useUserGovernanceTokenRewards(address);

  const isDelegatingToSelf = delegates === address;

  const votesDelegated = isDelegatingToSelf
    ? currentVotes - balanceOf
    : currentVotes;

  return (
    <>
      <Card>
        <Card.Body>
          <Box align="center" justify="space-between">
            <Text m={0}>Voting Power</Text>
            {variant === "primary" && (
              <Button variant="pill" onClick={openVoteDelegationModal}>
                Delegate votes
              </Button>
            )}
          </Box>
          <Heading m={0}>{commify(currentVotes.toFixed(4))} votes</Heading>
          <Label size="small">
            {commify(votesDelegated.toFixed(4))} delegated to you
          </Label>
          <Text mt="16px">Wallet balance</Text>
          <Heading m={0}>{commify(balanceOf.toFixed(4))} UNION</Heading>
          <Text mt="16px">Delegating to</Text>
          <Heading m={0}>Self</Heading>
          {variant === "primary" && (
            <>
              <Divider />
              <Box align="center" justify="space-between" mt="20px">
                <Text m={0}>Unclaimed Tokens</Text>
                <Button variant="pill">Claim tokens</Button>
              </Box>
              <Heading m={0}>
                {commify(unclaimedBalance.toFixed(4))} {unionSymbol}
              </Heading>
              <Label size="small">12.2 tokens per day</Label>
            </>
          )}

          {variant === "secondary" && (
            <Button
              icon="vouch"
              label="Delegate to this account"
              fluid
              mt="20px"
            />
          )}
        </Card.Body>
      </Card>
      {isVoteDelegationOpen && <VoteDelegationModal />}
    </>
  );
}

UserVotingOverview.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]),
};

UserVotingOverview.defaultProps = {
  variant: "primary",
};
