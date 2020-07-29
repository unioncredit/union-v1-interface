import classNames from "classnames";

const SegmentedControlButton = ({ active, onClick, label, small }) => {
  const cachedClassNames = classNames(
    "py-2 rounded w-full  focus:outline-none transition-colors duration-150",
    small ? "font-medium text-sm" : "font-semibold",
    active ? "bg-black-pure text-white" : "bg-transparent"
  );

  return (
    <div className="flex-1 px-2px">
      <button type="button" className={cachedClassNames} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

const SegmentedControlWrapper = ({ className, children }) => {
  const cachedClassNames = classNames(
    className,
    "rounded p-1 bg-grey-light w-full"
  );

  return (
    <div className={cachedClassNames}>
      <div className="flex -mx-2px">{children}</div>
    </div>
  );
};

const SegmentedControl = {
  Wrapper: SegmentedControlWrapper,
  Button: SegmentedControlButton,
};

export default SegmentedControl;
