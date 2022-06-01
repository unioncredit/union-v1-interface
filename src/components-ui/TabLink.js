import { Link } from "react-router-dom";

export const TabLink = ({ href, children, ...props }) => {
  return (
    <Link to={href}>
      <div {...props}>{children}</div>
    </Link>
  );
};
