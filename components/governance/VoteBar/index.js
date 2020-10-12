import classNames from "classnames";

/**
 * @name VoteBar
 *
 * @param {object} props
 * @param {number} props.percent
 * @param {("For"|"Against")} props.type
 */
const VoteBar = ({ percent, type }) => {
  const barClassNames = classNames(
    "h-1 relative rounded-full w-full bg-opacity-25",
    {
      "bg-passed-pure": type === "For",
      "bg-against-pure": type === "Against",
    }
  );

  const trackClassNames = classNames(
    "h-1 absolute rounded-full transition-all duration-200",
    {
      "bg-passed-pure": type === "For",
      "bg-against-pure": type === "Against",
    }
  );

  return (
    <div className={barClassNames}>
      <div
        className={trackClassNames}
        style={{ width: `calc(${percent} * 100%)`, willChange: "width" }}
      />
    </div>
  );
};

export default VoteBar;
