import { useState } from "react";

import useRewardsData from "hooks/data/useRewardsData";
import useStakeData from "hooks/data/useStakeData";
import format from "util/formatValue";
import useCurrentToken from "hooks/useCurrentToken";
import useTokenBalance from "hooks/data/useTokenBalance";

import { Card, Grid, Stat, ToggleMenu } from "union-ui";
import { DepositInput, WithdrawInput } from "components-ui";

const StakeType = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
};

const toggleMenuOptions = [
  { id: StakeType.DEPOSIT, label: "Deposit" },
  { id: StakeType.WITHDRAW, label: "Withdraw" },
];

export const StakeCardContent = ({ type, onComplete: handleOnComplete }) => {
  const [stakeType, setStakeType] = useState(type);

  const UNION = useCurrentToken("UNION");
  const { mutate: updateUnionBalance } = useTokenBalance(UNION);
  const { data: stakeData, mutate: updateStakeData } = useStakeData();
  const { mutate: updateRewardsData } = useRewardsData();

  const { totalStake = 0.0, withdrawableStake = 0.0 } =
    !!stakeData && stakeData;

  const onComplete = async () => {
    await updateUnionBalance();
    await updateStakeData();
    await updateRewardsData();
    if (typeof handleOnComplete === "function") {
      handleOnComplete();
    }
  };

  const onToggleChange = (item) => {
    setStakeType(item.id);
  };

  const initialActiveIndex = toggleMenuOptions.findIndex(
    ({ id }) => id === type
  );

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Col>
            <Stat
              size="medium"
              mb="24px"
              align="center"
              label="Dai Staked"
              value={format(totalStake)}
            />
          </Grid.Col>
          <Grid.Col>
            <Stat
              size="medium"
              mb="24px"
              align="center"
              label="Withdrawable"
              value={format(withdrawableStake)}
            />
          </Grid.Col>
        </Grid.Row>
      </Grid>
      <ToggleMenu
        fluid
        onChange={onToggleChange}
        items={toggleMenuOptions}
        initialActive={initialActiveIndex}
      />
      {stakeType === StakeType.DEPOSIT ? (
        <DepositInput {...{ totalStake, onComplete }} />
      ) : (
        <WithdrawInput {...{ withdrawableStake, totalStake, onComplete }} />
      )}
    </>
  );
};

export const StakeCard = ({ type }) => {
  return (
    <Card mb="20px">
      <Card.Header title="Stake" />
      <Card.Body>
        <StakeCardContent type={type} />
      </Card.Body>
    </Card>
  );
};
