import Link from "next/link";
import Offchain from "svgs/Offchain";
import Onchain from "svgs/Onchain";
import classNames from "classnames";

/**
 * @name ProposalStatusBadge
 * @param {object} props
 * @param {("Active"|"Passed"|"Failed")} props.status
 */
export const ProposalStatusBadge = ({ status = "Active" }) => {
  let icon = "Active";
  if (status === "Failed") icon = "Failed";
  if (status === "Passed") icon = "Passed";

  const cachedClassNames = classNames(
    "flex items-center space-x-2 p-2 rounded leading-tight"
  );

  return (
    <div className={cachedClassNames}>
      {icon}
      <span className="-my-2px">{status}</span>
    </div>
  );
};

/**
 * @name ProposalTypeBadge
 * @param {object} props
 * @param {("Offchain"|"Onchain")} props.type
 */
export const ProposalTypeBadge = ({ type = "Onchain" }) => {
  const icon = type === "Onchain" ? <Onchain /> : <Offchain />;

  return (
    <div className="flex items-center space-x-2 p-2 rounded-sm leading-tight bg-pink-3-lighter">
      {icon}
      <span className="-my-2px">{type}</span>
    </div>
  );
};

const GovernanceProposal = () => {
  return (
    <Link href="/governance">
      <a className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4 flex items-center space-x-24">
        <div className="flex-1 space-y-3">
          <p className="text-lg leading-tight font-semibold">
            Liquidity migration proposal
          </p>

          <div className="flex items-center space-x-4">
            <ProposalTypeBadge type="Onchain" />
            <div className="text-type-light">Executed on Aug 3, 2020</div>
          </div>
        </div>

        <div className="">
          <div>
            <progress max={100} value={50} />
          </div>
          <div>
            <progress max={100} value={50} />
          </div>
        </div>

        <div className="">
          <ProposalStatusBadge />
        </div>
      </a>
    </Link>
  );
};

export default GovernanceProposal;
