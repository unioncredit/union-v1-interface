import classNames from "classnames";

const Container = ({ children, className, wide = false }) => {
  const cachedClassNames = classNames(
    className,
    "w-full mx-auto",
    `max-w-screen-${wide ? "xl" : "lg"}-gutter`
  );

  return <div className={cachedClassNames}>{children}</div>;
};

export default Container;
