import { Link as RouterLink } from "react-router-dom";

export function Link({ children, href, ...props }) {
  return (
    <RouterLink to={href} {...props}>
      {children}
    </RouterLink>
  );
}
