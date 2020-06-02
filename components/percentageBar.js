import pastels from "lib/pastels";
import { toPercent } from "util/numbers";

const PercentageBar = ({ value, index }) => {
  const pct = toPercent(value);

  return (
    <div className="flex justify-end sm:justify-start">
      <span className="h-4 w-20 bar" />
      <span className="ml-2 leading-none">{pct}</span>
      <style jsx>{`
        .bar {
          border-radius: 5px;
          background: ${pastels[index]};
          min-width: 1rem;
          width: ${value * 100}px;
          max-width: 100px;
        }
      `}</style>
    </div>
  );
};

export default PercentageBar;
