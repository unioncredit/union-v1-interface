import classNames from "classnames";

const SegmentedControlButton = ({ active, onClick, label, small }) => {
  const cachedClassNames = classNames("segmented-control-button", {
    small,
    active,
  });

  return (
    <div className="flex-1">
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
      <div className="flex space-x-1">{children}</div>
    </div>
  );
};

const SegmentedControl = {
  Wrapper: SegmentedControlWrapper,
  Button: SegmentedControlButton,
};

export default SegmentedControl;
