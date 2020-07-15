import classNames from "classnames";
import use3BoxLabels from "hooks/3box/use3BoxLabels";
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
    copyable ? "focus:underline" : "cursor-inherit"
  );

  const { getLabel } = use3BoxLabels();

  const label = getLabel(address);

  return (
    <button
      onClick={copyable ? handleCopyAddress : undefined}
      className={cachedClassNames}
      title={address}
    >
      <div className="flex-grow-0 h-8">
        <Identicon large address={address} />
      </div>

      {withLabel && Boolean(label) ? (
        <p className="ml-4 flex-auto leading-none">
          <span className="block text-sm mb-2px font-semibold whitespace-no-wrap">
            {getLabel(address)}
          </span>
          <span className="text-xs text-type-light">
            {copied ? "Copied!" : ENSName ?? truncateAddress(address)}
          </span>
        </p>
      ) : (
        <p className="flex-auto leading-loose ml-4">
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
