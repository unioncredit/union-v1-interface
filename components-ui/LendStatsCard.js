import { useState } from "react";
import { Stat, Button, Bar, Grid, Card } from "union-ui";
import format from "util/formatValue";
import { roundDown, toPercent } from "util/numbers";
import useStakeData from "hooks/data/useStakeData";
import { Dai } from "components-ui";
import { useStakeModal, StakeModal } from "components-ui/modals";

export function LendStatsCard() {
  const { data: stakeData } = useStakeData();
  const { isOpen: isStakeModalOpen, open: openStakeModal } = useStakeModal();
  const [stakeType, setStakeType] = useState("deposit");

  const {
    totalStake = 0.0,
    utilizedStake = 0.0,
    defaultedStake = 0.0,
    withdrawableStake = 0.0,
  } = !!stakeData && stakeData;

  const percentageStake = utilizedStake / totalStake;

  const handleOpenStakeModal = (type) => () => {
    setStakeType(type);
    openStakeModal();
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
                  value={<Dai value={format(roundDown(totalStake))} />}
                />
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col xs={4}>
                <Stat
                  mt="24px"
                  label="Utilized"
                  align="center"
                  value={<Dai value={format(roundDown(utilizedStake))} />}
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
                  value={<Dai value={format(roundDown(withdrawableStake))} />}
                />
              </Grid.Col>
              <Grid.Col xs={4}>
                <Stat
                  mt="24px"
                  align="center"
                  label="Defaulted"
                  value={<Dai value={format(roundDown(defaultedStake))} />}
                  after="0 DAI frozen"
                />
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col xs={6}>
                <Button
                  label="Deposit DAI"
                  mt="24px"
                  onClick={handleOpenStakeModal("deposit")}
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Button
                  mt="24px"
                  label="Widthdraw DAI"
                  variant="secondary"
                  onClick={handleOpenStakeModal("withdraw")}
                />
              </Grid.Col>
            </Grid.Row>
          </Grid>
        </Card.Body>
      </Card>
      {isStakeModalOpen && <StakeModal type={stakeType} />}
    </>
  );
}
