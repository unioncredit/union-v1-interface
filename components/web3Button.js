import classNames from "classnames";
import PropTypes from "prop-types";

const Web3Button = ({ error = false, ...props }) => {
  const cachedClassNames = classNames(
    "font-medium px-4 py-3 rounded border leading-snug transition-colors duration-200",
    !error ? "bg-border-light" : "bg-red-500 border-red-700 text-white"
  );

  return <button className={cachedClassNames} {...props} />;
};

Web3Button.propTypes = {
  /**
   * Changes the button to an error background and border color
   */
  error: PropTypes.bool
};

export default Web3Button;
