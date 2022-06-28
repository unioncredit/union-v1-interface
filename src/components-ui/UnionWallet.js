import { useLocation } from "react-router-dom";
import { formatUnits } from "@ethersproject/units";
import { Button, Text, Tooltip } from "@unioncredit/ui";
import { ReactComponent as Union } from "@unioncredit/ui/lib/icons/union.svg";

import { ZERO } from "constants/variables";
import format from "util/formatValue";
import useToken from "hooks/useToken";
import useTokenBalance from "hooks/data/useTokenBalance";
import useRewardsData from "hooks/data/useRewardsData";
import { useClaimModal } from "components-ui/modals";

export function UnionWallet() {
  const UNION = useToken("UNION");
  const { pathname } = useLocation();
  const { data: unionBalance = ZERO } = useTokenBalance(UNION);
  const { data: rewardsData } = useRewardsData();
  const { open: openClaimModal } = useClaimModal();

  const { rewards = ZERO } = !!rewardsData && rewardsData;

  const total = rewards.add(unionBalance);

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
          {format(formatUnits(total, 18), 2)}
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
