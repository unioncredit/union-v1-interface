import classNames from "classnames";
import Link from "next/link";
import PropTypes from "prop-types";
import Spinner from "./spinner";

/**
 * @name Button
 *
 * @param {String} as For the "as" property for Next.js Link component if an internal link
 * @param {any} children The inside of the button
 * @param {String} className Any extra classes to spread into the button's classes
 * @param {String} href If set, turns the button into a link, internal or external
 * @param {Boolean} wide Makes the button have more left and right padding
 * @param {Boolean} full Makes the button take up the width of the container
 * @param {any} icon Adds an absolutely positioned icon to the left of the button
 * @param {Boolean} primary
 * @param {Boolean} secondary
 * @param {Boolean} tertiary
 * @param {Boolean} invert
 * @param {Boolean} submitting
 */
const Button = ({
  as,
  children,
  className = "",
  href,
  secondary,
  tertiary,
  invert,
  wide,
  icon,
  full,
  submitting,
  ...props
}) => {
  const cachedClassNames = classNames(className, "btn", {
    "btn-primary": !(secondary || tertiary || invert) ? true : false,
    "btn-secondary": secondary,
    "btn-tertiary": tertiary,
    "btn-invert": invert,
    "px-10": wide,
    "w-full": full,
    relative: icon || submitting,
    waiting: submitting,
  });

  if (href) {
    const isExternal = href && href.startsWith("http");

    const a = (
      <a className={cachedClassNames} href={href} {...props}>
        {children}
      </a>
    );

    return isExternal ? (
      a
    ) : (
      <Link href={href} as={as}>
        {a}
      </Link>
    );
  }

  if (submitting)
    return (
      <button className={cachedClassNames} {...props}>
        {/* <div className="btn-icon">
          <Spinner />
        </div> */}
        Waiting for confirmation...
      </button>
    );

  if (icon)
    return (
      <button className={cachedClassNames} {...props}>
        <div className="btn-icon">{icon}</div>
        {children}
      </button>
    );

  return (
    <button className={cachedClassNames} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  /**
   * For the "as" property for Next.js Link component if an internal link
   */
  as: PropTypes.string,
  /**
   * The inside of the button
   */
  children: PropTypes.any,
  /**
   * Any extra classes to spread into the button's classes
   */
  className: PropTypes.string,
  /**
   * If set, turns the button into a link, internal or external
   */
  href: PropTypes.string,
  /**
   * Makes the button have more left and right padding
   */
  wide: PropTypes.bool,
  /**
   * Makes the button take up the width of the container
   */
  full: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  invert: PropTypes.bool,
  icon: PropTypes.any,
  submitting: PropTypes.bool,
};

export default Button;
