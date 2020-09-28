import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";
import Overview from "svgs/Overview";
import Circuit from "svgs/Circuit";

/**
 * @name GovernanceSegmentedControlLink
 *
 * @param {object} props
 * @param {string} props.href
 * @param {("Overview"|"Voting Wallet")} props.label
 */
const GovernanceSegmentedControlLink = ({ href, label }) => {
  const router = useRouter();

  const isActive = href === router.pathname;

  const cachedClassNames = classNames(
    "inline-flex px-4 py-2 rounded items-center justify-center transition-colors duration-150 w-48 font-semibold whitespace-no-wrap focus:outline-none",
    isActive
      ? "bg-white shadow-governance-nav"
      : "bg-transparent text-pink-3-dark"
  );

  const iconCachedClassNames = classNames(
    "mr-2",
    isActive ? "text-pink-3-pure" : "inherit"
  );

  const icon = label === "Overview" ? <Overview /> : <Circuit />;

  return (
    <div className="flex-1">
      <Link href={href}>
        <a className={cachedClassNames}>
          <span className={iconCachedClassNames}>{icon}</span>
          <span className="leading-normal">{label}</span>
        </a>
      </Link>
    </div>
  );
};

const GovernanceSegmentedControlWrapper = ({ children }) => {
  return (
    <div className="p-1 bg-pink-3-light rounded-md overflow-hidden">
      <div className="flex space-x-1">{children}</div>
    </div>
  );
};

const GovernanceNavigation = () => {
  return (
    <div className="flex justify-center">
      <GovernanceSegmentedControlWrapper>
        <GovernanceSegmentedControlLink href="/governance" label="Overview" />
        <GovernanceSegmentedControlLink
          href="/governance/voting-wallet"
          label="Voting Wallet"
        />
      </GovernanceSegmentedControlWrapper>
    </div>
  );
};

export default GovernanceNavigation;
