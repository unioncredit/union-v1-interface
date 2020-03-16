import classNames from "classnames";
import Link from "next/link";

const Button = ({
  as,
  children,
  className,
  href,
  invert,
  secondary,
  wide,
  ...props
}) => {
  const cachedClassNames = classNames(
    className,
    "btn",
    `btn-${secondary ? "secondary" : invert ? "invert" : "primary"}`,
    {
      "w-full": wide
    }
  );

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

export default Button;
