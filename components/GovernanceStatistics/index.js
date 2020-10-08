import { commify } from "@ethersproject/units";
import GovernanceStatistic from "components/GovernanceStatistic";
import useStatisticsData from "hooks/governance/useStatisticsData";

/**
 * @name format
 * @param {number} value
 */
const format = (value) => commify(Number(value ?? 0).toFixed(2));

const GovernanceStatistics = () => {
  const { data } = useStatisticsData();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <GovernanceStatistic
        label={"Default rate"}
        value={"15%"}
        changePercentage={0.028}
        changePeriod="vs last week"
      />
      <GovernanceStatistic
        label={"Interest rate"}
        value={"10%"}
        changePercentage={-0.032}
        changePeriod="vs last week"
      />
      <GovernanceStatistic
        label={"Inflation rate"}
        value={"7.2%"}
        changePercentage={0.028}
        changePeriod="vs last week"
      />
      <GovernanceStatistic
        label={"Circulating supply"}
        value={"938,334.45 UNION"}
        changePercentage={0.028}
        changePeriod="vs last week"
      />
      <GovernanceStatistic
        label={"Outstanding loans"}
        value={`${format(data?.outstandingLoans)} DAI`}
        changePercentage={0}
        changePeriod="vs last week"
      />
      <GovernanceStatistic
        label={"Total staked"}
        value={`${format(data?.totalStaked)} DAI`}
        changePercentage={0}
        changePeriod="vs last week"
      />
    </div>
  );
};

export default GovernanceStatistics;
