import classNames from "classnames";

/**
 * @name VoteBar
 *
 * @param {object} props
 * @param {number} props.percent
 * @param {("For"|"Against"|"Quorum")} props.type
 * @param {number} props.height
 */
const VoteBar = ({ percent, type, height = 6 }) => {
  const barClassNames = classNames("relative rounded-full w-full", {
    "bg-passed-light": type === "For",
    "bg-against-light": type === "Against",
    "bg-quorum-light": type === "Quorum",
  });

  const trackClassNames = classNames(
    "absolute rounded-full transition-all duration-200",
    {
      "bg-passed-pure": type === "For",
      "bg-against-pure": type === "Against",
      "bg-quorum-pure": type === "Quorum",
    }
  );

  return (
    <div className={barClassNames} style={{ height }}>
      <div
        className={trackClassNames}
        style={{
          width: `calc(${percent} * 100%)`,
          maxWidth: "100%",
          willChange: "width",
          height,
        }}
      />
    </div>
  );
};

export default VoteBar;
