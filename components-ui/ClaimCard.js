import useCurrentToken from "hooks/useCurrentToken";
import useRewardsData from "hooks/data/useRewardsData";
import useStakeData from "hooks/data/useStakeData";
import useTokenBalance from "hooks/data/useTokenBalance";
import format from "util/formatValue";
import useUnionSymbol from "hooks/useUnionSymbol";

import { Card, Text, Button, Box, Label, Heading, ToggleMenu, InputRow, Input } from "union-ui";

export const ClaimCard = () => {
  const UNION = useCurrentToken("UNION");
  const { data: unionSymbol } = useUnionSymbol();

  const {
    data: unionBalance = 0.0,
    mutate: updateUnionBalance,
  } = useTokenBalance(UNION);

  const { data: rewardsData, mutate: updateRewardsData } = useRewardsData();

  const { rewards = 0.0, rewardsMultiplier = "0.00" } =
    !!rewardsData && rewardsData;

  const onComplete = async () => {
    await updateUnionBalance();
    await updateRewardsData();
  };

  return (
    <Card>
      <Card.Header title="UNION Token" />
      <Card.Body>
        <Box align="center" justify="space-between">
          <div>
            <Label as="p" size="small">
              Unclaimed
            </Label>
            <Heading size="large">{format(rewards, 3)} {unionSymbol}</Heading>
          </div>
          <Button label="Claim Tokens" variant="secondary" />
        </Box>
        <Box direction="vertical">
	        <Label as="p" size="small">
	          In wallet
	        </Label>
	        <Heading>{format(unionBalance, 3)} {unionSymbol}</Heading>
        </Box>
        <Box mt="12px">
          <Text>Union is a non-transferrable governance token used exclusively for voting on Union Improvement Proposals. Read more -></Text>
        </Box>
      </Card.Body>
    </Card>
  );
};
