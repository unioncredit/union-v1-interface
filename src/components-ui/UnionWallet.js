import { useLocation } from "react-router-dom";
import { Button, Text, Tooltip } from "@unioncredit/ui";
import { ReactComponent as Union } from "@unioncredit/ui/lib/icons/union.svg";

import format from "util/formatValue";
import useToken from "hooks/useToken";
import useTokenBalance from "hooks/data/useTokenBalance";
import useRewardsData from "hooks/data/useRewardsData";
import { useClaimModal } from "components-ui/modals";

export function UnionWallet() {
  const UNION = useToken("UNION");
  const { pathname } = useLocation();
  const { data: unionBalance = 0.0 } = useTokenBalance(UNION);
  const { data: rewardsData } = useRewardsData();
  const { open: openClaimModal } = useClaimModal();

  const { rewards = 0.0 } = !!rewardsData && rewardsData;

  const total = Number(rewards) + Number(unionBalance);

  const isGetStarted = pathname === "/get-started";

  const button = (
    <Button
      mr="4px"
      icon={Union}
      variant="secondary"
      className="union-wallet"
      onClick={openClaimModal}
      label={
        <Text mb="0" ml="4px">
          {format(total, 2)}
        </Text>
      }
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
