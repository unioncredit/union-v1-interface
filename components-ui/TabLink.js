import Link from "next/link";

export const TabLink = ({href, children, ...props}) => {
	return (<div {...props}><Link href={href}>{children}</Link></div>);
}