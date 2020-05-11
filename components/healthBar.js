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
    <div className="w-full relative md:ml-auto">
      <span className="block" />
      <style jsx>{`
        div {
          --fill: ${health >= 85
            ? "#3fc37c"
            : health >= 55
            ? "#F77849"
            : "#E61744"};
          --track: ${health >= 85
            ? "#ecf9f1"
            : health >= 55
            ? "#FCDFDF"
            : "#FAD1DA"};
        }
      `}</style>
      <style jsx>{`
        div {
          background-color: ${dark
            ? "rgba(255, 255, 255,0.1)"
            : "var(--track)"};
          min-width: ${width}px;
          max-width: 128px;
          border-radius: 1px;
          height: 14px;
        }
        span {
          background-color: var(--fill);
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
