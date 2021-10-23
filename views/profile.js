import {
  Grid,
  Stat,
  Button,
  Text,
  Box,
  Heading,
  Card,
  Icon,
  Badge,
  Label,
  Divider,
} from "union-ui";
import { View, Avatar, Copyable } from "components-ui";
import useCreditLimit from "hooks/data/useCreditLimit";
import useVouchData from "hooks/data/useVouchData";
import useTrustData from "hooks/data/useTrustData";
import { useWeb3React } from "@web3-react/core";
import usePublicData from "hooks/usePublicData";
import useVotingWalletData from "hooks/governance/useVotingWalletData";
import format from "util/formatValue";
import getReceipt from "util/getReceipt";
import { addActivity } from "hooks/data/useActivity";
import activityLabels from "util/activityLabels";
import isHash from "util/isHash";
import handleTxError from "util/handleTxError";
import useDelegate from "hooks/payables/useDelegate";

export default function ProfileView({ address }) {
  const { account, library } = useWeb3React();

  const delegate = useDelegate();
  const { name } = usePublicData(address);
  const { data: vouchData = [] } = useVouchData(address);
  const { data: trustData = [] } = useTrustData(address);
  const { data: creditLimit = "0.0" } = useCreditLimit(address);
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

  const vouchedForThem = trustData.some((x) => x.address === account);
  const vouchesForYou = vouchData.some((x) => x.address === account);

  const creditLimitSummary =
    creditLimit > 5000
      ? "> 5,000"
      : creditLimit > 1000
      ? "> 1,000"
      : creditLimit > 500
      ? "> 500"
      : creditLimit > 100
      ? "> 100"
      : "< 100";

  const handleDelegation = async () => {
    try {
      const { hash } = await delegate(address);
      await getReceipt(hash, library);
      addActivity(activityLabels.delegate({ address, hash }));
      close();
    } catch (err) {
      const hash = isHash(err.message) && err.message;
      handleTxError(err);
      addActivity(activityLabels.delegate({ address, hash }, true));
    }
  };

  return (
    <View>
      <Grid>
        <Grid.Row justify="center">
          <Grid.Col>
            <Card mt="24px">
              <Card.Body>
                <Box direction="vertical" align="center">
                  <Avatar size={56} address={address} />
                  <Heading mt="8px" mb={0}>
                    {name}
                  </Heading>
                  <Box align="center" justify="center" my="10px">
                    <Icon name="dollar" />
                    <Label as="p" grey={600} m={0} mr="8px">
                      {creditLimitSummary} DAI
                    </Label>
                    <Icon name="members" />
                    <Label as="p" grey={600} m={0} mr="8px">
                      {vouchData.length} Vouches
                    </Label>
                  </Box>
                  <Box>
                    <Badge
                      label={
                        <Copyable value={address}>
                          {address.slice(0, 6)}
                        </Copyable>
                      }
                      color="grey"
                    />
                  </Box>
                  {vouchesForYou && (
                    <Text mt="20px" mb={0} grey={500}>
                      Vouching for you
                    </Text>
                  )}
                  {vouchedForThem && (
                    <Button
                      fluid
                      mt="20px"
                      icon="vouch"
                      label={`Vouch for ${name}`}
                    />
                  )}
                  {account === address && (
                    <>
                      <Button
                        as="a"
                        target="_blank"
                        href="https://app.ens.domains/"
                        mt="32px"
                        mb="8px"
                        fluid
                        label={
                          <>
                            Get a custom ENS username
                            <Icon name="external" />
                          </>
                        }
                      />
                    </>
                  )}
                </Box>
              </Card.Body>
            </Card>
            <Card mt="24px">
              <Card.Body>
                <Grid>
                  <Grid.Row>
                    <Grid.Col>
                      <Heading m={0}>Reputation</Heading>
                      <Text mt="24px" mb="12px">
                        Wallet traits
                      </Text>
                    </Grid.Col>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Col>
                      <Stat
                        label="receiving vouches from"
                        value={`${vouchData.length} accounts`}
                      />
                    </Grid.Col>
                    <Grid.Col>
                      <Stat
                        label="Vouched for others"
                        value={`${trustData.length} times`}
                      />
                    </Grid.Col>
                  </Grid.Row>
                </Grid>
                <Divider mt="24px" />
                <Grid>
                  <Grid.Row>
                    <Grid.Col>
                      <Heading mt="24px">Governance</Heading>
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
                        label="From others"
                        value={format(votesDelegated)}
                      />
                    </Grid.Col>
                  </Grid.Row>
                  {address !== account && (
                    <Grid.Row>
                      <Grid.Col>
                        <Button
                          mt="24px"
                          variant="secondary"
                          label={`Delegate votes to ${name}`}
                          onClick={handleDelegation}
                        />
                      </Grid.Col>
                    </Grid.Row>
                  )}
                </Grid>
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </View>
  );
}
