import classNames from "classnames";
import ArrowCircle from "svgs/ArrowCircle";
import { toPercent } from "util/numbers";

/**
 * @name StatisticChange
 * @param {object} props
 * @param {number} props.percentage
 * @param {string} props.period
 */
const StatisticChange = ({ percentage, period }) => {
  const changeDirection = percentage > 0 ? "INCREASE" : "DECREASE";

  const changeCachedClassNames = classNames(
    "font-semibold",
    changeDirection === "INCREASE" ? "text-stat-increase" : "text-stat-decrease"
  );

  const icon =
    changeDirection === "INCREASE" ? (
      <ArrowCircle.Increase />
    ) : (
      <ArrowCircle.Decrease />
    );

  return (
    <div className="flex items-center">
      <span className="-mt-2px mr-2">{icon}</span>
      <span className={changeCachedClassNames}>
        {toPercent(percentage, 1)}{" "}
        <span className="text-sm font-medium text-type-light">{period}</span>
      </span>
    </div>
  );
};

/**
 * @name GovernanceStatistic
 * @param {object} props
 * @param {string} props.label
 * @param {string} props.value
 * @param {number} props.changePercentage
 * @param {string} props.changePeriod
 */
const GovernanceStatistic = ({
  label,
  value,
  changePercentage,
  changePeriod,
}) => {
  return (
    <div className="p-4 sm:p-6 rounded bg-white border shadow-governance-stat space-y-3 leading-tight">
      <p className="text-type-light">{label}</p>
      <p className="font-semibold text-xl leading-snug crop-snug">{value}</p>
      {Boolean(changePercentage && changePeriod) && (
        <StatisticChange percentage={changePercentage} period={changePeriod} />
      )}
    </div>
  );
};

export default GovernanceStatistic;
