import GovernanceStatistic from "components/GovernanceStatistic";

const GovernanceStatistics = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
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
        value={"938,334.45 DAI"}
        changePercentage={0.028}
        changePeriod="vs last week"
      />
      <GovernanceStatistic
        label={"Total staked"}
        value={"938,334.45 DAI"}
        changePercentage={-0.058}
        changePeriod="vs last week"
      />
    </div>
  );
};

export default GovernanceStatistics;
