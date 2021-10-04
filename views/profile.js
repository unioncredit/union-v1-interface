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
} from "union-ui";
import { useRouter } from "next/router";
import { Wrapper, Avatar, Copyable } from "components-ui";
import useCreditLimit from "hooks/data/useCreditLimit";
import useVouchData from "hooks/data/useVouchData";
import useTrustData from "hooks/data/useTrustData";
import { useWeb3React } from "@web3-react/core";
import usePublicData from "hooks/usePublicData";

const config = {
  title: "Profile page bitch",
};

export default function ProfileView() {
  const { account } = useWeb3React();
  const { query } = useRouter();
  const { address } = query;

  const { name } = usePublicData(address);
  const { data: vouchData = [] } = useVouchData(address);
  const { data: trustData = [] } = useTrustData(address);
  const { data: creditLimit = "0.0" } = useCreditLimit(address);

  const vouchesForYou = trustData.some((x) => x.address === account);
  const vouchedForThem = vouchData.some((x) => x.address === account);

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

  return (
    <Wrapper title={config.title}>
      <Grid>
        <Grid.Row justify="center">
          <Grid.Col xs={12} md={8} lg={6}>
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
                      {creditLimitSummary}
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
                      <Button
                        fluid
                        icon="avatar"
                        variant="secondary"
                        label={
                          <>
                            Change profile photo
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
              </Card.Body>
            </Card>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </Wrapper>
  );
}
