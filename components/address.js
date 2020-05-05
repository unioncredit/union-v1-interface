import useCopy from "@hooks/useCopy";
import useENSName from "@hooks/useENSName";
import truncateAddress from "@util/truncateAddress";
import { memo } from "react";
import Identicon from "./identicon";

const Address = ({ address }) => {
  const ENSName = useENSName(address);

  const [copied, copy] = useCopy();

  const handleCopyAddress = () => copy(address);

  return (
    <button
      onClick={handleCopyAddress}
      className="font-medium focus:outline-none flex items-center align-middle w-40"
      title={address}
    >
      <Identicon large address={address} />
      <p className="leading-loose ml-4">
        {copied ? "Copied!" : ENSName ?? truncateAddress(address)}
      </p>
    </button>
  );
};

export default memo(Address);
