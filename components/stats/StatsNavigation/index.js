import { useRouter } from "next/router";
import classNames from "classnames";
import Link from "next/link";

const StatsLink = ({ href, label }) => {
  const router = useRouter();
  const isActive = href === router.pathname;
  const linkClassNames = classNames(
    "inline-block rounded py-2 px-4 font-medium duration-150 transition-colors",
    isActive
      ? "bg-black-pure hover:bg-black-dark text-white"
      : "hover:bg-black-pure hover:bg-opacity-10 text-type-base"
  );

  return (
    <li className="pr-2 pb-2">
      <Link href={href}>
        <a className={linkClassNames}>{label}</a>
      </Link>
    </li>
  );
};

const StatsNavigation = () => {
  return (
    <ul className="flex flex-wrap -mb-2">
      <StatsLink href="/stats" label="Union Token" />
      <StatsLink href="/stats/u-token" label="UToken" />
      <StatsLink href="/stats/user-manager" label="User Manager" />
      <StatsLink href="/stats/asset-manager" label="Asset Manager" />
      <StatsLink href="/stats/market-settings" label="Market Settings" />
      <StatsLink href="/stats/gov-vars" label="Governance" />
    </ul>
  );
};

export default StatsNavigation;
