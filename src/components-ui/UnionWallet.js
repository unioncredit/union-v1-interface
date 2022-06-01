import { Button, Text, Tooltip } from "@unioncredit/ui";
import { ReactComponent as Union } from "@unioncredit/ui/lib/icons/union.svg";
import { useClaimModal } from "components-ui/modals";
import format from "util/formatValue";
import useCurrentToken from "hooks/useCurrentToken";
import useTokenBalance from "hooks/data/useTokenBalance";
import useRewardsData from "hooks/data/useRewardsData";
import { useLocation } from "react-router-dom";

export function UnionWallet() {
  const { pathname } = useLocation();
  const UNION = useCurrentToken("UNION");
  const { data: unionBalance = 0.0 } = useTokenBalance(UNION);
  const { data: rewardsData } = useRewardsData();

  const { open: openClaimModal } = useClaimModal();

  const { rewards = 0.0 } = !!rewardsData && rewardsData;

  const total = Number(rewards) + Number(unionBalance);

  const isGetStarted = pathname === "/";

  const button = (
    <Button
      onClick={openClaimModal}
      icon={Union}
      variant="secondary"
      label={
        <Text mb="0" ml="4px">
          {format(total, 2)}
        </Text>
      }
      className="union-wallet"
      mr="4px"
    />
  );

  return rewards > 0 && unionBalance < 1 && isGetStarted ? (
    <Tooltip
      position="bottom"
      content="Collect your accrued UNION rewards"
      alwaysShow
    >
      {button}
    </Tooltip>
  ) : (
    button
  );
}
