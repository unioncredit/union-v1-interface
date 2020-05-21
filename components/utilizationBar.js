import PropTypes from "prop-types";

/**
 * @name UtilizationBar
 *
 * @param {Number} health The health of the user, between 0 - 100
 * @param {Number} width The width of the HealthBar
 */
const UtilizationBar = ({ usage, width = 96 }) => {
  const inner = usage >= 100 ? 100 : usage <= 0 ? 0 : usage;

  return (
    <div className="w-full relative md:ml-auto">
      <span className="block" />
      <style jsx>{`
        div {
          background-color: rgba(255, 255, 255, 0.1);
          min-width: ${width}px;
          max-width: 128px;
          border-radius: 1px;
          height: 14px;
        }
        span {
          background-color: ${usage >= 66
            ? "#E61744"
            : usage >= 33
            ? "#F77849"
            : "#3fc37c"};
          width: ${inner}%;
          height: 14px;
        }
      `}</style>
    </div>
  );
};

UtilizationBar.propTypes = {
  usage: PropTypes.number.isRequired,
  /**
   * The width of the UtilizationBar
   */
  width: PropTypes.number,
};

export default UtilizationBar;
