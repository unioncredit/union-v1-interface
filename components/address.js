import useCopy from "@hooks/useCopy";
import useENSName from "@hooks/useENSName";
import truncateAddress from "@util/truncateAddress";
import classNames from "classnames";
import { memo } from "react";
import Identicon from "./identicon";

const Address = ({ address, copyable = false }) => {
  const ENSName = useENSName(address);

  const [copied, copy] = useCopy();

  const handleCopyAddress = () => copy(address);

  const cachedClassNames = classNames(
    "font-medium focus:outline-none flex h-8 items-center align-middle w-40",
    copyable ? "" : "cursor-inherit"
  );

  return (
    <button
      onClick={copyable ? handleCopyAddress : undefined}
      className={cachedClassNames}
      title={address}
    >
      <div>
        <Identicon large address={address} />
      </div>
      <p className="leading-loose ml-4">
        {copied ? "Copied!" : ENSName ?? truncateAddress(address)}
      </p>
    </button>
  );
};

export default memo(Address);
