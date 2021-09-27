import {
  Card,
  Stat,
  Stats,
  Button,
  Grid,
  Row,
  Col,
  Heading,
  Text,
} from "union-ui";
import { useWeb3React } from "@web3-react/core";
import { Wrapper, UserVotingOverview, LiveProposals, Dai } from "components-ui";
import useStatisticsData from "hooks/governance/useStatisticsData";
import { useDefaultedAmount } from "hooks/stats/uTokenStats/useDefaultedAmount";
import format from "util/formatValue";
import { toPercent } from "util/numbers";

export function GovernanceStatsCard() {
  const { data } = useStatisticsData();
  const { data: defaultedAmount } = useDefaultedAmount();

  console.log(data);

  return (
    <Card>
      <Card.Header title="Protocol statistics" align="center" />
      <Card.Body>
        <Grid>
          <Grid.Row>
            <Grid.Col xs={12}>
              <Stat
                size="medium"
                align="center"
                label="Lending pool"
                value={<Dai value={format(data?.lendingPoolBalance)} />}
              />
            </Grid.Col>
            <Grid.Col xs={12}>
              <Stat
                mt="24px"
                size="medium"
                align="center"
                label="Lending pool"
                value={<Dai value={format(data?.lendingPoolBalance)} />}
              />
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col>
              <Stat
                mt="32px"
                align="center"
                label="Outstanding loans"
                value={<Dai value={format(data?.outstandingLoans)} />}
              />
            </Grid.Col>
            <Grid.Col>
              <Stat
                mt="32px"
                align="center"
                label="Total defaulted"
                value={<Dai value={format(defaultedAmount)} />}
              />
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col xs={12}>
              <Button
                mt="32px"
                variant="secondary"
                label="Dune Analytics"
                icon="external"
                iconPosition="end"
              />
            </Grid.Col>
          </Grid.Row>
        </Grid>
      </Card.Body>
    </Card>
  );
}
