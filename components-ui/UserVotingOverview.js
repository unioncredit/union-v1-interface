import { useVoteDelegationModal } from "components-ui/modals";
import { Avatar } from "components-ui";
import { Box, Badge, Heading, Card, Button, Stat, Grid } from "union-ui";
import useVotingWalletData from "hooks/governance/useVotingWalletData";
import format from "util/formatValue";
import { useWeb3React } from "@web3-react/core";
import usePublicData from "hooks/usePublicData";
import { Copyable } from "./Copyable";
import truncateAddress from "util/truncateAddress";

export function UserVotingOverview({ address }) {
  const { account } = useWeb3React();
  const { ENSName, BoxName } = usePublicData(account);
  const { open: openVoteDelegationModal } = useVoteDelegationModal();
  const { data: votingWalletData } = useVotingWalletData(address);
  const {
    balanceOf = 0,
    currentVotes = 0,
    delegates,
  } = !!votingWalletData && votingWalletData;

  const isDelegatingToSelf = delegates === address;

  const votesDelegated = isDelegatingToSelf
    ? currentVotes - balanceOf
    : currentVotes;

  const truncatedAddress = (
    <Copyable value={address}>{truncateAddress(address)}</Copyable>
  );

  const [label1] = [ENSName || BoxName, truncatedAddress].filter(Boolean);

  return (
    <Card>
      <Card.Body>
        <Grid>
          <Grid.Row>
            <Grid.Col xs={12}>
              <Box align="center" mb="24px">
                <Avatar size={54} address={account} />
                <Box direction="vertical" mx="16px">
                  <Heading level={2} mb="4px">
                    {label1}
                  </Heading>
                  <Badge
                    color="grey"
                    label={
                      <Copyable value={address}>{address.slice(0, 6)}</Copyable>
                    }
                  />
                </Box>
              </Box>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col>
              <Stat label="Total Votes" value={format(currentVotes)} />
            </Grid.Col>
            <Grid.Col>
              <Stat label="Union Balance" value={format(balanceOf)} />
            </Grid.Col>
            <Grid.Col>
              <Stat label="From others" value={format(votesDelegated)} />
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col>
              <Stat mt="28px" label="DELEGATING TO" value={"self"} />
            </Grid.Col>
            <Grid.Col>
              <Button
                mt="28px"
                variant="secondary"
                inline
                label="Delegate votes"
                onClick={openVoteDelegationModal}
              />
            </Grid.Col>
          </Grid.Row>
        </Grid>
      </Card.Body>
    </Card>
  );
}
