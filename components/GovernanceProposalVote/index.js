import { commify } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import getEtherscanLink from "util/getEtherscanLink";
import Address from "../address";

/**
 *
 * @param {object} props
 * @param {string} props.address
 * @param {("For"|"Against")} props.vote
 * @param {number} props.votes
 * @param {string} props.tx
 */
const GovernanceProposalVote = ({
  address = "0xf6fDeE29e3A14610fdbE187e2d3442543cfA45B8",
  vote = "For",
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
      <div className="flex justify-between py-4 border-b">
        <Address address={address} />
        <div>
          <span className="font-semibold">{vote}</span> ({commify(votes)})
        </div>
      </div>
    </a>
  );
};

export default GovernanceProposalVote;
