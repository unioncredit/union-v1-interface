import PropTypes from "prop-types";

/**
 * @name HealthBar
 *
 * @param {Number} health The health of the user, between 0 - 100
 * @param {Number} width The width of the HealthBar
 */
const HealthBar = ({ health, width = 96 }) => {
  const inner = health > 100 ? 100 : health < 0 ? 0 : health;

  return (
    <div className="w-full relative overflow-hidden ml-auto">
      <span className="block" />
      <style jsx>{`
        div {
          background-color: #ecf9f1;
          min-width: ${width}px;
          max-width: 128px;
          border-radius: 1px;
          height: 14px;
        }
        span {
          background-color: #3fc37c;
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
