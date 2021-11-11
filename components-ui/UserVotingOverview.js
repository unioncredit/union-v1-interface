import {
  Box,
  Badge,
  Heading,
  Card,
  Button,
  Stat,
  Grid,
  Tooltip,
  Label,
} from "union-ui";
import TooltipIcon from "union-ui/lib/icons/tooltip.svg";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import External from "union-ui/lib/icons/externalinline.svg";
import {
  useVoteDelegationModal,
  VoteDelegationModal,
} from "components-ui/modals";
import format from "util/formatValue";
import usePublicData from "hooks/usePublicData";
import truncateAddress from "util/truncateAddress";
import { Avatar, Copyable } from "components-ui";
import useVotingWalletData from "hooks/governance/useVotingWalletData";

export function UserVotingOverview({ address }) {
  const { account } = useWeb3React();
  const { ENSName, BoxName } = usePublicData(account);

  const { isOpen: isVoteDelegationOpen, open: openVoteDelegationModal } =
    useVoteDelegationModal();

  const { data: votingWalletData } = useVotingWalletData(address);

  const {
    balanceOf = 0,
    currentVotes = 0,
    delegates,
  } = !!votingWalletData && votingWalletData;

  const { ENSName: delegatesENS, name: delegatesName } =
    usePublicData(delegates);

  const isVotingConfigured = Number(delegates) !== 0;

  const isDelegatingToSelf = delegates === address;

  const votesDelegated = isDelegatingToSelf
    ? currentVotes - balanceOf
    : currentVotes;

  const truncatedAddress = (
    <Copyable value={address}>{truncateAddress(address)}</Copyable>
  );

  const [label1] = [ENSName || BoxName, truncatedAddress].filter(Boolean);

  return (
    <>
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
                        <Copyable value={address}>
                          {address.slice(0, 6)}
                        </Copyable>
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
                <Stat
                  label={
                    <Label size="small" weight="medium">
                      From others{" "}
                      <Tooltip content="If other users delegate their votes to you, they’ll appear here.">
                        <TooltipIcon />
                      </Tooltip>
                    </Label>
                  }
                  value={format(votesDelegated)}
                />
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col>
                <Stat
                  mt="28px"
                  label="DELEGATING TO"
                  value={
                    !isVotingConfigured ? (
                      "Not configured"
                    ) : isDelegatingToSelf ? (
                      "Self"
                    ) : (
                      <Link href={`/profile/${delegates}`}>
                        <a>
                          {delegatesENS || delegatesName} <External />
                        </a>
                      </Link>
                    )
                  }
                />
              </Grid.Col>
              <Grid.Col>
                <Box ml="auto">
                  <Button
                    mt="28px"
                    variant="secondary"
                    label={
                      isVotingConfigured ? "Delegate votes" : "Set up voting"
                    }
                    onClick={openVoteDelegationModal}
                  />
                </Box>
              </Grid.Col>
            </Grid.Row>
          </Grid>
        </Card.Body>
      </Card>
      {isVoteDelegationOpen && <VoteDelegationModal />}
    </>
  );
}
