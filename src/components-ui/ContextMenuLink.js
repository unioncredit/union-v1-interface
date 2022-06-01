import { Link } from "react-router-dom";

export function ContextMenuLink({ href, children, ...props }) {
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  );
}
