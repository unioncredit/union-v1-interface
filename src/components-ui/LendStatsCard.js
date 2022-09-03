import { Stat, Button, Bar, Grid, Card } from "@unioncredit/ui";

import { ZERO } from "constants/variables";
import format from "util/formatValue";
import { toPercent } from "util/numbers";
import useStakeData from "hooks/data/useStakeData";
import { Dai } from "components-ui/Dai";
import { useStakeModal, StakeModal, StakeType } from "components-ui/modals";
import { formatUnits } from "@ethersproject/units";

export function LendStatsCard() {
  const { data: stakeData } = useStakeData();
  const { open: openStakeModal } = useStakeModal();

  const {
    totalStake = ZERO,
    utilizedStake = ZERO,
    defaultedStake = ZERO,
    withdrawableStake = ZERO,
  } = !!stakeData && stakeData;

  const percentageStake = utilizedStake / totalStake;

  const defaultedStakeView = format(formatUnits(defaultedStake, 18), 2);
  const totalStakeView = format(formatUnits(totalStake, 18), 2);
  const utilizedStakeView = format(formatUnits(utilizedStake, 18), 2);
  const withdrawableStakeView = format(formatUnits(withdrawableStake, 18), 2);

  const handleOpenStakeModal = (type) => () => {
    openStakeModal(type);
  };

  return (
    <>
      <Card>
        <Card.Header title="Staked Funds" align="center" />
        <Card.Body>
          <Grid>
            <Grid.Row>
              <Grid.Col xs={12}>
                <Stat
                  size="large"
                  align="center"
                  label="Staked"
                  value={<Dai value={totalStakeView} />}
                />
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col xs={4}>
                <Stat
                  mt="24px"
                  label="Utilized"
                  align="center"
                  value={<Dai value={utilizedStakeView} />}
                  after={
                    <Bar
                      label={toPercent(percentageStake)}
                      percentage={percentageStake * 100}
                    />
                  }
                />
              </Grid.Col>
              <Grid.Col xs={4}>
                <Stat
                  mt="24px"
                  align="center"
                  label="Withdrawable"
                  value={<Dai value={withdrawableStakeView} />}
                />
              </Grid.Col>
              <Grid.Col xs={4}>
                <Stat
                  mt="24px"
                  align="center"
                  label="Defaulted"
                  value={<Dai value={defaultedStakeView} />}
                />
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col xs={6}>
                <Button
                  label="Deposit DAI"
                  mt="24px"
                  onClick={handleOpenStakeModal(StakeType.STAKE)}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Button
                  mt="24px"
                  label="Withdraw DAI"
                  variant="secondary"
                  onClick={handleOpenStakeModal(StakeType.UNSTAKE)}
                />
              </Grid.Col>
            </Grid.Row>
          </Grid>
        </Card.Body>
      </Card>
      <StakeModal />
    </>
  );
}
