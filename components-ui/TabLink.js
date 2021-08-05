import Link from "next/link";

export const TabLink = ({ href, children, ...props }) => {
  return (
    <Link href={href}>
      <div {...props}>{children}</div>
    </Link>
  );
};

