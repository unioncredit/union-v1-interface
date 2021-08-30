import {
  Nav,
  NavItem,
  Card,
  Multiplier,
  NavIcon,
  Text,
  Heading,
  Button,
  Label,
  Box,
} from "union-ui";
import { ClaimButton } from "components-ui";
import useTokenBalance from "hooks/data/useTokenBalance";
import useRewardsData from "hooks/data/useRewardsData";
import useUnionSymbol from "hooks/useUnionSymbol";
import useCurrentToken from "hooks/useCurrentToken";
import format from "util/formatValue";

export function RewardsCard() {
  const UNION = useCurrentToken("UNION");
  const { data: unionSymbol } = useUnionSymbol();
  const { data: rewardsData } = useRewardsData();
  const { data: unionBalance = 0.0 } = useTokenBalance(UNION);

  const { rewards = 0.0, rewardsMultiplier = "0.00" } =
    !!rewardsData && rewardsData;
  return (
    <Card size="small">
      <Card.Body>
        <Box align="center" mb="16px">
          <NavIcon name="union-token" />
          <Text grey={700} m={0} ml="6px">
            Rewards
          </Text>
        </Box>
        <Text m={0}>
          <Label grey={600}>Unclaimed {unionSymbol}</Label>
        </Text>
        <Heading mb={0}>{format(rewards)}</Heading>
        <Text mb="12px">
          <Label grey={600}>{format(unionBalance)} in wallet</Label>
        </Text>
        <Text mb={0}>
          <Label grey={600}>Earning multiplier</Label>
        </Text>
        <Multiplier multiplier={Number(rewardsMultiplier)} />
        <ClaimButton label="Claim all rewards" fluid mt="18px" />
      </Card.Body>
    </Card>
  );
}
