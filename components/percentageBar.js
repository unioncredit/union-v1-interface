import pastels from "lib/pastels";
import { toPercent } from "util/numbers";
import classNames from "classnames";

const PercentageBar = ({ value, index, className }) => {
  const pct = toPercent(value || 0);

  const cachedClassNames = classNames(
    className,
    "flex justify-end sm:justify-start space-x-2"
  );

  return (
    <div className={cachedClassNames}>
      <span className="h-4 w-20 bar" />
      <span className="leading-none">{pct}</span>
      <style jsx>{`
        .bar {
          border-radius: 5px;
          background: ${pastels[index]};
          min-width: 1rem;
          width: ${value * 100}px;
          max-width: 72px;
        }
        @media screen and (min-width: 768px) {
          .bar {
            max-width: 96px;
          }
        }
      `}</style>
    </div>
  );
};

export default PercentageBar;
