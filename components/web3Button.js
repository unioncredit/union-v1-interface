import classNames from "classnames";

const Web3Button = ({ error = false, ...props }) => {
  const cachedClassNames = classNames(
    "font-medium px-4 py-3 rounded border leading-snug transition-colors duration-200",
    !error
      ? "bg-gray-100 border-gray-200 hover:bg-gray-300 hover:border-gray-400"
      : "bg-red-500 border-red-700 hover:bg-red-700 hover:border-red-900 text-white"
  );

  return <button className={cachedClassNames} {...props} />;
};

export default Web3Button;
