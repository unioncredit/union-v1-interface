import { useWeb3React } from "@web3-react/core";
import Skeleton from "components/Skeleton";
import dayjs from "dayjs";
import useProposalHistory from "hooks/governance/useProposalHistory";
import { Fragment } from "react";
import LinkExternal from "svgs/LinkExternal";
import getEtherscanLink from "util/getEtherscanLink";
import truncateAddress from "util/truncateAddress";
import Link from "next/link";
import useProposalData from "hooks/governance/useProposalData";

const Event = ({ name, date, tx }) => {
  const { chainId } = useWeb3React();

  return (
    <li className="flex space-x-4">
      <div className="mt-2 h-2 w-2 rounded-full bg-grey-light" />
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

const formatTs = (ts) => dayjs.unix(ts).format("MMMM D, YYYY h:m A");

const ProposalEventHistory = ({ id }) => {
  const { data } = useProposalHistory(id);
  const proposal = useProposalData(id);

  const hasHistory = data && data.length > 0;

  return (
    <div className="px-4">
      <h2>Proposal history</h2>

      {/* Spacer */}
      <div className="h-8" />

      <ul className="space-y-6">
        {hasHistory ? (
          <Fragment>
            {data.map((event, i) => {
              let eventName = event.name;

              if (event.name === "ProposalCreated") {
                return (
                  <Fragment key={i}>
                    <Event
                      name={
                        <span>
                          Proposed by{" "}
                          <Link
                            href={`/governance/address/${event.args.proposer}`}
                          >
                            <a>
                              <u>{truncateAddress(event.args.proposer)}</u>
                            </a>
                          </Link>
                        </span>
                      }
                      tx={event.transactionHash}
                      date={formatTs(event.timestamp)}
                    />
                    <Event name={"Active"} date={formatTs(event.timestamp)} />
                  </Fragment>
                );
              }

              if (event.name === "ProposalExecuted") eventName = "Executed";

              if (event.name === "ProposalQueued") eventName = "Queued";

              if (event.name === "ProposalCanceled") eventName = "Cancelled";

              return (
                <Event
                  key={i}
                  name={eventName}
                  tx={event.transactionHash}
                  date={formatTs(event.timestamp)}
                />
              );
            })}

            {proposal?.status === "defeated" && (
              <Event name={"Defeated"} date={formatTs(proposal.endTimestamp)} />
            )}
          </Fragment>
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

export default ProposalEventHistory;
