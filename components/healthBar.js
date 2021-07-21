import classNames from "classnames";
import PropTypes from "prop-types";

/**
 * @name HealthBar
 *
 * @param {object} props
 * @param {number} props.health The health of the user, between 0 - 100
 * @param {boolean} props.isPoisoned
 */
const HealthBar = ({ health, isPoisoned }) => {
  const fillWidth = health > 100 ? 100 : health <= 0 ? 2 : health;

  const fillColor = isPoisoned
    ? "#6D3FC3"
    : health >= 66
    ? "#3fc37c"
    : health >= 33
    ? "#F77849"
    : "#E61744";

  const trackColor = isPoisoned
    ? "#F0ECF9"
    : health >= 66
    ? "#ecf9f1"
    : health >= 33
    ? "#FCDFDF"
    : "#FAD1DA";

  const cachedTrackClassNames = classNames(
    "health-track h-4 w-full overflow-hidden rounded-sm relative ml-auto"
  );

  return (
    <div className={cachedTrackClassNames}>
      <span className="health-fill  h-4 block" />
      <style jsx>{`
         {
          --fill: ${fillColor};
          --track: ${trackColor};
        }

        .health-track {
          background-color: var(--track);
          min-width: 96px;
          max-width: 96px;
        }

        @media screen and (min-width: 768px) {
          .health-track {
            max-width: 128px;
          }
        }

        .health-fill {
          background-color: var(--fill);
          width: ${fillWidth}%;
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
  isPoisoned: PropTypes.bool,
};

export default HealthBar;
