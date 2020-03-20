import classNames from "classnames";

const Vouch = ({ width, index }) => {
  return (
    <div className={classNames("h-16", `bg-green-${9 - index}00`)}>
      <style jsx>{`
        div {
          width: ${width}%;
        }
      `}</style>
    </div>
  );
};

const VouchBar = ({ className, slices }) => {
  return (
    <div className={className}>
      <div className="h-16 flex rounded overflow-hidden relative w-full select-none flex-row-reverse">
        {slices.map((width, i) => (
          <Vouch key={i} index={i} width={width} />
        ))}
      </div>
    </div>
  );
};

export default VouchBar;
