import classNames from "classnames";

const Container = ({ children, wide = false }) => {
  const cachedClassNames = classNames("w-full mx-auto", {
    "max-w-screen-lg-gutter": !wide,
    "max-w-screen-xl-gutter": wide
  });

  return <div className={cachedClassNames}>{children}</div>;
};

export default Container;
