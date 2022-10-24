import {
  Grid,
  Card,
  Stat,
  Button,
  ButtonRow,
  Divider,
  Label,
} from "@unioncredit/ui";

import format from "util/formatValue";
import useToken from "hooks/useToken";
import useStakeData from "hooks/data/useStakeData";
import useRewardsData from "hooks/data/useRewardsData";
import useUnionSymbol from "hooks/useUnionSymbol";
import useTokenBalance from "hooks/data/useTokenBalance";
import { Dai, Union } from "components-ui";
import { useStakeModal, StakeType } from "components-ui/modals";
import { ZERO } from "constants/variables";
import { formatUnits } from "@ethersproject/units";
import { ReactComponent as Tooltip } from "@unioncredit/ui/lib/icons/tooltip.svg";
import styles from "./Box.module.css";

export function StakeStepCard() {
  const UNION = useToken("UNION");
  const { data: stakeData } = useStakeData();
  const { open: openStakeModal } = useStakeModal();
  const { data: rewardsData } = useRewardsData();
  const { data: unionSymbol = "UNION" } = useUnionSymbol();
  const { data: unionBalance = ZERO } = useTokenBalance(UNION);

  const { totalStake = ZERO } = !!stakeData && stakeData;

  const { rewards = ZERO } = !!rewardsData && rewardsData;

  const totalUnion = rewards.add(unionBalance);

  return (
    <Card size="fluid" mb="24px">
      <Card.Header
        title={`Stake DAI to earn ${unionSymbol}`}
        subTitle={`Your staked DAI is used to back vouches you provide to other members. It also accrues UNION at a rate relative to the amount of DAI you have staked.`}
      />
      <Card.Body>
        <Divider mb="32px" />
        <Grid>
          <Grid.Row>
            <Grid.Col xs={6}>
              <Stat
                size="large"
                align="left"
                label="TOTAL STAKE"
                value={<Dai value={format(formatUnits(totalStake), 2)} />}
              />
            </Grid.Col>
            <Grid.Col xs={6}>
              <Stat
                size="large"
                align="left"
                label={`${unionSymbol} Accrued`}
                value={<Union value={format(formatUnits(totalUnion), 2)} />}
              />
            </Grid.Col>
          </Grid.Row>
        </Grid>
        <div className={styles.box}>
          <Label as="span" align="left" grey={500}>
            Membership Fee
          </Label>
          <Tooltip width="12px" pl="4px" />
          <Label as="span" align="right" grey={500} className={styles.right}>
            {"0"} UNION
          </Label>
        </div>
        <Divider />
        <div className={styles.box}>
          <Label as="span" align="left" grey={500}>
            Estimated daily earnings
          </Label>
          <Tooltip width="12px" pl="4px" />
          <Label as="span" align="right" grey={500} className={styles.right}>
            {"0"} UNION
          </Label>
        </div>
        <ButtonRow fluid>
          <Button
            fluid
            label="Stake"
            onClick={() => openStakeModal(StakeType.STAKE)}
          />
          <Button
            fluid
            label="Unstake"
            variant="secondary"
            onClick={() => openStakeModal(StakeType.UNSTAKE)}
          />
        </ButtonRow>
      </Card.Body>
    </Card>
  );
}
