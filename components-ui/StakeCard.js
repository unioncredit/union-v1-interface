import { useState } from "react";

import useRewardsData from "hooks/data/useRewardsData";
import useStakeData from "hooks/data/useStakeData";
import format from "util/formatValue";
import useCurrentToken from "hooks/useCurrentToken";
import useTokenBalance from "hooks/data/useTokenBalance";

import { Card, Box, Label, Heading, ToggleMenu } from "union-ui";
import { DepositInput, WithdrawInput, Dai } from "components-ui";

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
  const { data: rewardsData, mutate: updateRewardsData } = useRewardsData();

  const { totalStake = 0.0, withdrawableStake = 0.0 } =
    !!stakeData && stakeData;

  const { rewardsMultiplier = "0.00" } = !!rewardsData && rewardsData;

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
      <Box align="center" justify="space-between">
        <div>
          <Label as="p" size="small">
            Currently Staked
          </Label>
          <Heading size="large">
            <Dai value={format(totalStake)} />
          </Heading>
          <Label as="p" size="small">
            Earning at {rewardsMultiplier}x
          </Label>
        </div>
        <ToggleMenu
          onChange={onToggleChange}
          items={toggleMenuOptions}
          initialActive={initialActiveIndex}
        />
      </Box>
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
