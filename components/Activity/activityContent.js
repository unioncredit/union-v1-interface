import { useWeb3React } from "@web3-react/core";
import Identicon from "components/identicon";
import { Pending } from "svgs/Alerts";
import BellCircle from "svgs/BellCircle";
import Spinner from "svgs/Spinner";
import getEtherscanLink from "util/getEtherscanLink";
import truncateAddress from "util/truncateAddress";

const UpdateTrust = ({ borrower, trustAmount, hash, date }) => {
  const { chainId } = useWeb3React();

  return (
    <li className="text-sm pt-4">
      <div className="flex space-x-4">
        <div>
          <Identicon address={borrower} large />
        </div>
        <div>
          <p className="whitespace-normal leading-snug crop-snug mb-2">
            <strong>{truncateAddress(borrower)}</strong> now trusts you with{" "}
            <strong>{trustAmount} DAI</strong>
          </p>
          <div className="flex justify-between leading-none text-type-light space-x-2">
            <p>
              <a
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
                href={getEtherscanLink(chainId, hash, "TRANSACTION")}
              >
                See details
              </a>
            </p>
            <p className="text-right">{date}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

const ApplyMember = ({ date }) => {
  return (
    <li className="text-sm pt-4">
      <div className="flex space-x-4">
        <div>
          <Pending size={32} />
        </div>
        <div>
          <p className="whitespace-normal leading-snug crop-snug mb-2">
            <strong>Congratulations</strong> you are now a member of Union.
          </p>
          <div className="flex justify-between leading-none text-type-light space-x-2">
            <span />
            <p className="text-right">{date}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

/**
 *
 * @param {object} props
 * @param {array} props.data
 */
const ActivityContent = ({ data }) => {
  if (!data)
    return (
      <div className="flex p-4 items-center justify-center">
        <Spinner />
      </div>
    );

  if (data.length === 0)
    return (
      <div className="pt-6 pb-4  flex flex-col items-center">
        <BellCircle />
        <p className="mt-4 text-center">
          You don't have
          <br />
          any notifications yet
        </p>
      </div>
    );

  return (
    <ul className="divide-y space-y-4 -mt-4">
      {data.map((log, i) => {
        if (log.type === "UpdateTrust") return <UpdateTrust key={i} {...log} />;

        if (log.type === "ApplyMember") return <ApplyMember key={i} {...log} />;

        return (
          <li key={i}>
            <pre>
              <code>{JSON.stringify(log, null, 2)}</code>
            </pre>
          </li>
        );
      })}
    </ul>
  );
};

export default ActivityContent;
