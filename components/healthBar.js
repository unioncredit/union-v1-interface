import PropTypes from "prop-types";

/**
 * @name HealthBar
 *
 * @param {Number} health The health of the user, between 0 - 100
 * @param {Number} width The width of the HealthBar
 * @param {Boolean} dark
 */
const HealthBar = ({ health, width = 96, dark }) => {
  const inner = health > 100 ? 100 : health < 0 ? 0 : health;

  return (
    <div className="w-full relative ml-auto">
      <span className="block" />
      <style jsx>{`
        div {
          background-color: ${dark ? "rgba(255, 255, 255,0.1)" : "#ecf9f1"};
          min-width: ${width}px;
          max-width: 128px;
          border-radius: 1px;
          height: 14px;
        }
        span {
          background-color: #3fc37c;
          box-shadow: 10px 4px 23px rgba(93, 206, 141, 0.15);
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
  width: PropTypes.number,
  dark: PropTypes.bool,
};

export default HealthBar;
