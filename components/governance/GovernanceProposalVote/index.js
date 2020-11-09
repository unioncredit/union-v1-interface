import { commify } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import Identicon from "components/identicon";
import Skeleton from "components/Skeleton";
import getEtherscanLink from "util/getEtherscanLink";
import truncateAddress from "util/truncateAddress";

/**
 * @name GovernanceProposalVote
 *
 * @param {object} props
 * @param {string} props.address
 * @param {("for"|"against")} props.vote
 * @param {number} props.votes
 * @param {string} props.tx
 */
const GovernanceProposalVote = ({
  address = "0xf6fDeE29e3A14610fdbE187e2d3442543cfA45B8",
  vote = "for",
  tx = "0xc288c518505397bad7348cd9a0b497dd1a997db106cfb0ed11c210eb17adbf9e",
  votes = 200000,
}) => {
  const { chainId } = useWeb3React();

  const voteTxLink = getEtherscanLink(chainId, tx, "TRANSACTION");

  return (
    <a
      href={voteTxLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block px-4"
    >
      <div className="flex justify-between items-center py-4 border-b">
        <div className="flex items-center space-x-4">
          <Identicon address={address} size={40} />
          <p className="font-semibold">{truncateAddress(address)}</p>
        </div>

        <div>
          <span className="font-semibold capitalize">{vote}</span> (
          {commify(votes.toFixed(2))})
        </div>
      </div>
    </a>
  );
};

export default GovernanceProposalVote;

export const GovernanceProposalVoteSkeleton = () => {
  return (
    <div className="px-4">
      <div className="flex justify-between items-center py-4 border-b">
        <div className="flex items-center space-x-4">
          <Skeleton width={40} height={40} circle />
          <Skeleton width={110} height={24} />
        </div>

        <div>
          <Skeleton width={130} height={24} />
        </div>
      </div>
    </div>
  );
};
