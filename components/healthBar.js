import PropTypes from "prop-types";
import withinRange from "@util/withinRange";

/**
 * @name HealthBar
 *
 * @param {Number} health The health of the user, between 0 - 100
 * @param {Number} width The width of the HealthBar
 */
const HealthBar = ({ health, width = 100 }) => {
  return (
    <div className="w-full bg-green-200 relative">
      <span className="block bg-green-600" />
      <style jsx>{`
        div {
          min-width: ${width}px;
          height: 14px;
        }
        span {
          width: ${health}%;
          height: 14px;
        }
      `}</style>
    </div>
  );
};

HealthBar.propTypes = {
  /**
   * The health of the user, between 0 - 100
   */
  health: withinRange,
  /**
   * The width of the HealthBar
   */
  width: PropTypes.number
};

export default HealthBar;
