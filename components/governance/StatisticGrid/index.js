import { commify } from "@ethersproject/units";
import Statistic from "components/governance/Statistic";
import useStatisticsData from "hooks/governance/useStatisticsData";
import { useDefaultedAmount } from "hooks/stats/uTokenStats/useDefaultedAmount";
import { toPercent } from "util/numbers";

/**
 * @name format
 * @param {number} value
 */
const format = (value) => commify(Number(value ?? 0).toFixed(2));

const StatisticGrid = () => {
  const { data } = useStatisticsData();
  const { data: defaultedAmount } = useDefaultedAmount();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Statistic
        label={"Total defaulted"}
        value={`${format(defaultedAmount)} DAI`}
      />
      <Statistic
        label={"Interest rate"}
        value={toPercent(data?.interestRate ?? 0)}
      />
      <Statistic
        label={"Lending Pool balance"}
        value={`${format(data?.lendingPoolBalance)} DAI`}
      />
      <Statistic
        label={"Total supply"}
        value={`${format(data?.totalSupply)} UNION`}
      />
      <Statistic
        label={"Outstanding loans"}
        value={`${format(data?.outstandingLoans)} DAI`}
      />
      <Statistic
        label={"Total staked"}
        value={`${format(data?.totalStaked)} DAI`}
      />
    </div>
  );
};

export default StatisticGrid;
