import { commify } from "@ethersproject/units";
import GovernanceStatistic from "components/governance/GovernanceStatistic";
import useStatisticsData from "hooks/governance/useStatisticsData";
import { toPercent } from "util/numbers";

/**
 * @name format
 * @param {number} value
 */
const format = (value) => commify(Number(value ?? 0).toFixed(2));

const GovernanceStatistics = () => {
  const { data } = useStatisticsData();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <GovernanceStatistic label={"Default rate"} value={toPercent(0)} />
      <GovernanceStatistic
        label={"Interest rate"}
        value={toPercent(data?.interestRate ?? 0)}
      />
      <GovernanceStatistic label={"Inflation rate"} value={toPercent(0)} />
      <GovernanceStatistic
        label={"Total supply"}
        value={`${format(data?.totalSupply)} UNION`}
      />
      <GovernanceStatistic
        label={"Outstanding loans"}
        value={`${format(data?.outstandingLoans)} DAI`}
      />
      <GovernanceStatistic
        label={"Total staked"}
        value={`${format(data?.totalStaked)} DAI`}
      />
    </div>
  );
};

export default GovernanceStatistics;
