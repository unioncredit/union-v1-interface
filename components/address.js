import Identicon from "./identicon";
import useENSName from "@hooks/useENSName";
import truncateAddress from "@util/truncateAddress";

const Address = ({ address }) => {
  const ENSName = useENSName(address);

  return (
    <div className="inline-flex items-center align-middle">
      <Identicon large address={address} />
      <p className="leading-loose ml-4">
        {ENSName ?? truncateAddress(address)}
      </p>
    </div>
  );
};

export default Address;
