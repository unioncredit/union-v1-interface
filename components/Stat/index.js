import classNames from "classnames";

const Stat = ({ label, value, light = false }) => {
  const cachedClassNames = classNames(
    "p-4 sm:p-6 rounded-lg border",
    light
      ? "border-white border-opacity-75 bg-white bg-opacity-50"
      : "border-pink-pure bg-pink-2-light"
  );
  return (
    <div className={cachedClassNames}>
      <div className="font-semibold mb-4 crop-tight leading-tight">{label}</div>
      <div className="flex justify-between">
        <span className="text-3xl font-semibold leading-tight crop-tight">
          {value}
        </span>
      </div>
    </div>
  );
};

export default Stat;
