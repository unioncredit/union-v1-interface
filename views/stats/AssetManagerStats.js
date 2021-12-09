import { Stat, Grid } from "union-ui";
import { Dai } from "components-ui";

import format from "util/formatValue";
import useAssetManagerStats from "hooks/stats/assetManagerStats";

const daiValue = (value, decimal = 4) => <Dai value={format(value, decimal)} />;

function useAssetManagerStatsView() {
  const {
    loanableAmount,
    poolBalance,
    assetManagerDAIBalance,
    daiInLendingProtocols,
    daiInCompound,
    compoundFloor,
    compoundCeiling,
    daiInAave,
    aaveFloor,
    aaveCeiling,
    daiInPureAdapter,
    pureFloor,
    pureCeiling,
  } = useAssetManagerStats();

  return [
    { label: "Available Credit", value: daiValue(loanableAmount) },
    { label: "Pool Balance", value: daiValue(poolBalance) },
    { label: "DAI in Contract", value: daiValue(assetManagerDAIBalance) },
    {
      label: "DAI In Lending Protocols",
      value: daiValue(daiInLendingProtocols),
    },
    { label: "DAI In Compound", value: daiValue(daiInCompound) },
    { label: "DAI In Aave", value: daiValue(daiInAave) },
    { label: "DAI In Pure Adapter", value: daiValue(daiInPureAdapter) },
    { label: "Pure Adapter Floor", value: daiValue(pureFloor) },
    { label: "Pure Adapter Ceiling", value: daiValue(pureCeiling) },
    { label: "Aave Floor", value: daiValue(aaveFloor) },
    { label: "Aave Ceiling", value: daiValue(aaveCeiling) },
    { label: "Compound Floor", value: daiValue(compoundFloor) },
    { label: "Compound Ceiling", value: daiValue(compoundCeiling) },
  ];
}

export default function AssetManagerStats() {
  const stats = useAssetManagerStatsView();

  return (
    <>
      {stats.map((stat) => (
        <Grid.Col md={3} key={stat.label}>
          <Stat
            align="center"
            mb="28px"
            label={stat.label}
            value={stat.value}
          />
        </Grid.Col>
      ))}
    </>
  );
}
