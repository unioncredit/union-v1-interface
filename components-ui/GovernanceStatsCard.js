import { useWeb3React } from "@web3-react/core";
import { Card, Stat, Button, Grid } from "union-ui";
import { Dai } from "components-ui";
import useStatisticsData from "hooks/governance/useStatisticsData";
import useInterestRate from "hooks/stats/marketSettingsStats/useInterestRate";
import format from "util/formatValue";
import { duneAnalytics } from "constants/app";
import { toPercent } from "util/numbers";

import External from "union-ui/lib/icons/externalinline.svg";

export function GovernanceStatsCard() {
  const { chainId } = useWeb3React();
  const { data } = useStatisticsData();
  const { data: interestRate } = useInterestRate();

  const duneAnalyticsUrl = duneAnalytics[chainId] || "#";

  return (
    <Card>
      <Card.Header title="Protocol statistics" align="center" />
      <Card.Body>
        <Grid>
          <Grid.Row>
            <Grid.Col>
              <Stat
                mt="8px"
                align="center"
                label="Total staked"
                value={<Dai value={format(data?.totalStaked, 2)} />}
              />
            </Grid.Col>
            <Grid.Col>
              <Stat
                mt="8px"
                align="center"
                label="Lending pool"
                value={<Dai value={format(data?.lendingPoolBalance, 2)} />}
              />
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col>
              <Stat
                mt="32px"
                align="center"
                label="Outstanding loans"
                value={<Dai value={format(data?.outstandingLoans, 2)} />}
              />
            </Grid.Col>
            <Grid.Col>
              <Stat
                mt="32px"
                align="center"
                label="Interest rate"
                value={toPercent(interestRate)}
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
                icon={External}
                iconPosition="end"
              />
            </Grid.Col>
          </Grid.Row>
        </Grid>
      </Card.Body>
    </Card>
  );
}