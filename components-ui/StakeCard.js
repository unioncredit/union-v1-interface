import { useState } from "react";

import useRewardsData from "hooks/data/useRewardsData";
import useStakeData from "hooks/data/useStakeData";
import format from "util/formatValue";
import useCurrentToken from "hooks/useCurrentToken";
import useTokenBalance from "hooks/data/useTokenBalance";

import { Card, Box, Label, Heading, ToggleMenu } from "union-ui";
import { DepositInput, WithdrawInput } from "components-ui";

const StakeType = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
};

const toggleMenuOptions = [
  { id: StakeType.DEPOSIT, label: "Deposit" },
  { id: StakeType.WITHDRAW, label: "Withdraw" },
];

export const StakeCard = () => {
  const [stakeType, setStakeType] = useState("deposit");

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
  };

  const onToggleChange = (item) => {
    setStakeType(item.id);
  };

  return (
    <Card>
      <Card.Header title="Stake" />
      <Card.Body>
        <Box align="center" justify="space-between">
          <div>
            <Label as="p" size="small">
              Currently Staked
            </Label>
            <Heading size="large">{format(totalStake)} DAI</Heading>
            <Label as="p" size="small">
              Earning at {rewardsMultiplier}x
            </Label>
          </div>
          <ToggleMenu onChange={onToggleChange} items={toggleMenuOptions} />
        </Box>
        {stakeType === StakeType.DEPOSIT ? (
          <DepositInput {...{ totalStake, onComplete }} />
        ) : (
          <WithdrawInput {...{ withdrawableStake, totalStake, onComplete }} />
        )}
      </Card.Body>
    </Card>
  );
};
