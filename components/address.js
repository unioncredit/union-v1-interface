import classNames from "classnames";
import useAddressLabels from "hooks/useAddressLabels";
import useCopy from "hooks/useCopy";
import useENSName from "hooks/useENSName";
import { memo } from "react";
import truncateAddress from "util/truncateAddress";
import Identicon from "./identicon";

const Address = ({ address, withLabel, copyable = false }) => {
  const ENSName = useENSName(address);

  const [copied, copy] = useCopy();

  const handleCopyAddress = () => copy(address);

  const cachedClassNames = classNames(
    "font-medium focus:outline-none flex text-left",
    copyable ? "" : "cursor-inherit"
  );

  const { getLabel } = useAddressLabels();

  const label = getLabel(address);

  return (
    <button
      onClick={copyable ? handleCopyAddress : undefined}
      className={cachedClassNames}
      title={address}
    >
      <Identicon large address={address} />

      {withLabel && Boolean(label) ? (
        <p className="ml-4 leading-none">
          <div className="font-semibold">{getLabel(address)}</div>
          <span className="text-xs text-type-light">
            {copied ? "Copied!" : ENSName ?? truncateAddress(address)}
          </span>
        </p>
      ) : (
        <p className="leading-loose ml-4">
          {copied ? "Copied!" : ENSName ?? truncateAddress(address)}
        </p>
      )}

      <style jsx>{`
        button {
          width: 11rem;
        }
      `}</style>
    </button>
  );
};

export default memo(Address);
