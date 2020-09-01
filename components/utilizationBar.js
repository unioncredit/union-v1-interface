import PropTypes from "prop-types";
import { roundDown, toPercent } from "util/numbers";

/**
 * @name UtilizationBar
 *
 * @param {Object} props
 * @param {Number} props.usage The health of the user, between 0.00 - 1.00
 */
const UtilizationBar = ({ usage }) => {
  const fillWidth = usage >= 1 ? 100 : usage <= 0 ? 0 : usage * 100;

  const fillColor =
    usage >= 0.66 ? "#E61744" : usage >= 0.33 ? "#F77849" : "#3fc37c";

  return (
    <div className="utilization-track w-full rounded-sm overflow-hidden relative md:ml-auto">
      <span className="utilization-fill block" />
      <style jsx>{`
         {
          --fill: ${fillColor};
        }

        .utilization-track {
          background-color: rgba(255, 255, 255, 0.1);
          width: 96px;
          height: 14px;
        }

        .utilization-fill {
          background-color: var(--fill);
          width: ${fillWidth}%;
          height: 14px;
        }
      `}</style>
    </div>
  );
};

UtilizationBar.propTypes = {
  /**
   * The health of the user, between 0.00 - 1.00
   */
  usage: PropTypes.number.isRequired,
};

export default UtilizationBar;

const getPctUsed = (borrowed, creditLimit) => {
  if (creditLimit === 0 && borrowed === 0) return 0;
  return borrowed / (creditLimit + borrowed);
};

/**
 * @name UtilizationBar
 *
 * @param {Object} props
 * @param {Number} props.borrowed
 * @param {Number} props.creditLimit
 */
export const UtilizationBarWithPercentage = ({ borrowed, creditLimit }) => {
  const pctUsed = getPctUsed(borrowed, roundDown(creditLimit));

  return (
    <div className="flex items-center">
      <p className="mr-4 text-white">{toPercent(pctUsed)}</p>
      <UtilizationBar usage={pctUsed} />
    </div>
  );
};

UtilizationBarWithPercentage.propTypes = {
  borrowed: PropTypes.number.isRequired,
  creditLimit: PropTypes.number.isRequired,
};
