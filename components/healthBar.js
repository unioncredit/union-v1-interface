import classNames from "classnames";
import PropTypes from "prop-types";

/**
 * @name HealthBar
 *
 * @param {Number} health The health of the user, between 0 - 100
 */
const HealthBar = ({ health }) => {
  const fillWidth = health > 100 ? 100 : health < 0 ? 0 : health;

  const fillColor =
    health >= 66 ? "#3fc37c" : health >= 33 ? "#F77849" : "#E61744";

  const trackColor =
    health >= 66 ? "#ecf9f1" : health >= 33 ? "#FCDFDF" : "#FAD1DA";

  const cachedTrackClassNames = classNames(
    "health-track h-4 w-full overflow-hidden rounded-sm relative ml-auto",
    {
      dead: health <= 0,
    }
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

        .dead {
          background: repeating-linear-gradient(
            135deg,
            hsl(347deg 80% 90%),
            hsl(347deg 80% 90%) 10px,
            hsl(347deg 80% 85%) 10px,
            hsl(347deg 80% 85%) calc(2 * 10px)
          );
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
};

export default HealthBar;
