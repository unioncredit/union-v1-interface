import PropTypes from "prop-types";
import withinRange from "@util/withinRange";

/**
 * @name HealthBar
 *
 * @param {Number} health The health of the user, between 0 - 100
 * @param {Number} width The width of the HealthBar
 */
const HealthBar = ({ health, width = 96 }) => {
  const inner = health > 100 ? 100 : health < 0 ? 0 : health;

  return (
    <div className="w-full bg-green-200 relative overflow-hidden">
      <span className="block bg-green-600" />
      <style jsx>{`
        div {
          min-width: ${width}px;
          border-radius: 2px;
          height: 14px;
        }
        span {
          width: ${inner}%;
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
  health: PropTypes.number.isRequired,
  /**
   * The width of the HealthBar
   */
  width: PropTypes.number
};

export default HealthBar;
