import classNames from "classnames";

const Web3Button = ({ error, ...props }) => {
  const cachedClassNames = classNames(
    "font-medium px-4 py-3 rounded border leading-snug transition-colors duration-200",
    error
      ? "border-red-700 bg-red-500 text-white"
      : "border-gray-200 bg-gray-100 hover:bg-gray-300 hover:border-gray-400"
  );

  return <button className={cachedClassNames} {...props} />;
};

export default Web3Button;
