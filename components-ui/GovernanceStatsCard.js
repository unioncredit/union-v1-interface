import { useWeb3React } from "@web3-react/core";
import { Card, Stat, Button, Grid } from "union-ui";
import { Dai } from "components-ui";
import useStatisticsData from "hooks/governance/useStatisticsData";
import { useDefaultedAmount } from "hooks/stats/uTokenStats/useDefaultedAmount";
import format from "util/formatValue";
import { duneAnalytics } from "constants/app";

export function GovernanceStatsCard() {
  const { chainId } = useWeb3React();
  const { data } = useStatisticsData();
  const { data: defaultedAmount } = useDefaultedAmount();

  const duneAnalyticsUrl = duneAnalytics[chainId] || "#";

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
                as="a"
                href={duneAnalyticsUrl}
                target="_blank"
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
