import classNames from "classnames";
import dayjs from "dayjs";
import Link from "next/link";
import Offchain from "svgs/Offchain";
import Onchain from "svgs/Onchain";
import Status from "svgs/Status";

/**
 * @name ProposalStatusBadge
 * @param {object} props
 * @param {("pending"|"active"|"canceled"|"defeated"|"succeeded"|"queued"|"expired"|"executed")} props.status
 */
export const ProposalStatusBadge = ({ status = "active" }) => {
  let icon = <Status.Active />;
  if (status === "executed") icon = <Status.Passed />;
  if (status === "defeated" || status === "canceled") icon = <Status.Failed />;

  const cachedClassNames = classNames(
    "inline-flex items-center space-x-2 p-2 font-semibold rounded leading-tight",
    {
      "bg-active-light text-active-pure":
        status === "active" || status === "pending" || status === "queued",
      "bg-passed-light text-passed-pure": status === "executed",
      "bg-failed-light text-failed-pure":
        status === "defeated" || status === "expired" || status === "canceled",
    }
  );

  return (
    <div className={cachedClassNames}>
      {icon}
      <span className="-my-2px capitalize">{status}</span>
    </div>
  );
};

/**
 * @name ProposalVoteBadge
 * @param {object} props
 * @param {("For"|"Against"|"No Vote")} props.vote
 */
export const ProposalVoteBadge = ({ vote = "No Vote" }) => {
  let icon = <Status.NoVote />;
  if (vote === "For") icon = <Status.Passed />;
  if (vote === "Against") icon = <Status.Failed />;

  const cachedClassNames = classNames(
    "inline-flex items-center space-x-2 font-semibold rounded leading-tight border",
    {
      "text-failed-pure": vote === "No Vote",
      "text-passed-pure": vote === "For",
      "text-against-pure": vote === "Against",
    }
  );

  return (
    <div className={cachedClassNames}>
      {icon}
      <span className="-my-2px">{vote}</span>
      <style jsx>{`
        div {
          padding: calc(0.5rem - 1px);
        }
      `}</style>
    </div>
  );
};

/**
 * @name ProposalTypeBadge
 * @param {object} props
 * @param {("offchain"|"onchain")} props.type
 * @param {string} props.className
 */
export const ProposalTypeBadge = ({ type = "onchain", className }) => {
  let icon = <Onchain />;
  if (type === "Offchain") icon = <Offchain />;

  const cachedClassNames = classNames(
    "inline-flex items-center space-x-2 p-2 rounded-sm leading-tight bg-pink-3-lighter capitalize",
    className
  );

  return (
    <div className={cachedClassNames}>
      {icon}
      <span className="-my-2px">{type}</span>
    </div>
  );
};

/**
 *
 * @param {object} props
 * @param {string} props.title
 * @param {string|number} props.id
 * @param {string} props.date
 * @param {("offchain"|"onchain")} props.type
 * @param {("pending"|"active"|"canceled"|"defeated"|"succeeded"|"queued"|"expired"|"executed")} props.status
 * @param {("For"|"Against"|"No Vote")} props.vote
 */
const GovernanceProposal = ({
  title = "Liquidity migration proposal",
  id = 1,
  date,
  type = "onchain",
  status = "executed",
  vote,
}) => {
  const formatDate = dayjs.unix(date).format("MMM D, YYYY");

  return (
    <Link href="/governance/proposals/[id]" as={`/governance/proposals/${id}`}>
      <a className="p-4 flex items-center">
        <div className="flex-1 space-y-3">
          <p className="text-lg leading-tight font-semibold">{title}</p>

          <div className="flex items-center space-x-4">
            {vote && <ProposalVoteBadge vote={vote} />}

            <ProposalTypeBadge type={type} />

            <div className="text-type-light">Executed on {formatDate}</div>
          </div>
        </div>

        <ProposalStatusBadge status={status} />
      </a>
    </Link>
  );
};

export default GovernanceProposal;
