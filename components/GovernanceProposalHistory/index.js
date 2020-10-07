import { useWeb3React } from "@web3-react/core";
import Skeleton from "components/Skeleton";
import dayjs from "dayjs";
import useProposalHistory from "hooks/governance/useProposalHistory";
import { Fragment } from "react";
import LinkExternal from "svgs/LinkExternal";
import getEtherscanLink from "util/getEtherscanLink";
import truncateAddress from "util/truncateAddress";

const Event = ({ name, date, tx }) => {
  const { chainId } = useWeb3React();

  return (
    <li>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-lg leading-tight font-semibold">{name}</div>

          {/* Spacer */}
          <div className="h-2" />

          <div className="text-type-light leading-tight">
            <time dateTime={date}>{date}</time>
          </div>
        </div>

        {Boolean(tx) && (
          <a
            href={getEtherscanLink(chainId, tx, "TRANSACTION")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <LinkExternal />
          </a>
        )}
      </div>
    </li>
  );
};

const EventSkeleton = () => {
  return (
    <li>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-lg leading-tight">
            <Skeleton width={245} />
          </div>

          {/* Spacer */}
          <div className="h-2" />

          <div className="leading-tight">
            <Skeleton width={225} />
          </div>
        </div>

        <Skeleton width={24} height={24} />
      </div>
    </li>
  );
};

const GovernanceProposalHistory = ({ id }) => {
  const { data } = useProposalHistory(id);

  const hasHistory = data && data.length > 0;

  return (
    <div className="px-4">
      <h2>Proposal history</h2>

      {/* Spacer */}
      <div className="h-8" />

      <ul className="space-y-6">
        {hasHistory ? (
          data.map((event, i) => {
            let eventName;

            if (event.name === "ProposalCreated") {
              eventName = (
                <span>
                  Proposed by <u>{truncateAddress(event.args.proposer)}</u>
                </span>
              );
            }

            if (event.name === "ProposalExecuted") eventName = "Executed";

            if (event.name === "ProposalQueued") eventName = "Queued";

            const formatDate = dayjs
              .unix(event.timestamp)
              .format("MMMM D, YYYY h:m A");

            return (
              <Event
                key={i}
                name={eventName}
                tx={event.transactionHash}
                date={formatDate}
              />
            );
          })
        ) : (
          <Fragment>
            <EventSkeleton />
            <EventSkeleton />
            <EventSkeleton />
          </Fragment>
        )}
      </ul>
    </div>
  );
};

export default GovernanceProposalHistory;
