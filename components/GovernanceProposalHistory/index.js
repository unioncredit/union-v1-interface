import { useWeb3React } from "@web3-react/core";
import LinkExternal from "svgs/LinkExternal";
import getEtherscanLink from "util/getEtherscanLink";

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

const GovernanceProposalHistory = () => {
  return (
    <div className="px-4">
      <h2>Proposal history</h2>

      {/* Spacer */}
      <div className="h-8" />

      <ul className="space-y-6">
        <Event
          name={
            <span>
              Proposed by <u>0x1234...5678</u>
            </span>
          }
          date="July 19, 2020 2:09 PM"
          tx="0xc288c518505397bad7348cd9a0b497dd1a997db106cfb0ed11c210eb17adbf9e"
        />
        <Event name="Active" date="July 19, 2020 2:09 PM" />
        <Event name="Succeeded" date="July 19, 2020 2:09 PM" />
        <Event
          name="Queued"
          date="July 19, 2020 2:09 PM"
          tx="0xc288c518505397bad7348cd9a0b497dd1a997db106cfb0ed11c210eb17adbf9e"
        />
        <Event
          name="Executed"
          date="July 19, 2020 2:09 PM"
          tx="0xc288c518505397bad7348cd9a0b497dd1a997db106cfb0ed11c210eb17adbf9e"
        />
      </ul>
    </div>
  );
};

export default GovernanceProposalHistory;
