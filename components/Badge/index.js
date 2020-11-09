import classNames from "classnames";

const Badge = ({ label }) => {
  const cachedClassNames = classNames(
    "text-sm font-inter leading-4 font-semibold py-2px px-1 rounded bg-pink-2-pure bg-opacity-25"
  );

  return <div className={cachedClassNames}>{label}</div>;
};

export default Badge;
