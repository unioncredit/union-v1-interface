import classNames from "classnames";
import Link from "next/link";
import PropTypes from "prop-types";

/**
 * @name Button
 *
 * @param {String} as For the "as" property for Next.js Link component if an internal link
 * @param {any} children The inside of the button
 * @param {String} className Any extra classes to spread into the button's classes
 * @param {String} href If set, turns the button into a link, internal or external
 * @param {Boolean} wide Makes the button full-width
 * @param {("primary"|"secondary"|"tertiary"|"invert")} type The style of button to be displayed
 */
const Button = ({
  as,
  children,
  className = "",
  href,
  type = "primary",
  wide,
  ...props
}) => {
  const cachedClassNames = classNames(className, "btn", `btn-${type}`, {
    "w-full": wide
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

  return (
    <button type="button" className={cachedClassNames} {...props}>
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
   * Makes the button full-width
   */
  wide: PropTypes.bool,
  /**
   * The style of button to be displayed
   */
  type: PropTypes.oneOf(["primary", "secondary", "tertiary", "invert"])
};

export default Button;
