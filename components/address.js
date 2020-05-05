import useENSName from "@hooks/useENSName";
import truncateAddress from "@util/truncateAddress";
import { memo } from "react";
import Identicon from "./identicon";

const Address = ({ address }) => {
  const ENSName = useENSName(address);

  return (
    <div className="inline-flex items-center align-middle">
      <Identicon large address={address} />
      <p className="leading-loose ml-4" title={address}>
        {ENSName ?? truncateAddress(address)}
      </p>
    </div>
  );
};

export default memo(Address);
