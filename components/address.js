import classNames from "classnames";
import use3BoxPublicData from "hooks/use3BoxPublicData";
import useAddressLabels from "hooks/useAddressLabels";
import useCopy from "hooks/useCopy";
import useENSName from "hooks/useENSName";
import { memo } from "react";
import truncateAddress from "util/truncateAddress";
import Identicon from "./identicon";
import ProfileImage from "./ProfileImage";

const Address = ({ address, withLabel, copyable = false }) => {
  const ENSName = useENSName(address);

  const [copied, copy] = useCopy();

  const handleCopyAddress = () => copy(address);

  const cachedClassNames = classNames(
    "font-medium focus:outline-none flex text-left",
    copyable ? "focus:underline" : "cursor-inherit"
  );

  const { getLabel } = useAddressLabels();
  const label = getLabel(address);
  const hasLabel = withLabel && !!label;

  const { data, error } = use3BoxPublicData(address);
  const has3BoxName = !!data && !error && data?.name;
  const has3BoxProfileImage = !!data && !error && data?.image;

  return (
    <button
      onClick={copyable ? handleCopyAddress : undefined}
      className={cachedClassNames}
      title={address}
    >
      <div className="flex-grow-0 h-8">
        {has3BoxProfileImage ? (
          <ProfileImage alt={ENSName ?? address} image={data.image} size={32} />
        ) : (
          <Identicon large address={address} />
        )}
      </div>

      {hasLabel ? (
        <p className="ml-4 flex-auto leading-none">
          <span className="block text-sm mb-2px font-semibold whitespace-no-wrap">
            {getLabel(address)}
          </span>
          <span className="text-xs text-type-light">
            {copied ? "Copied!" : ENSName ?? truncateAddress(address)}
          </span>
        </p>
      ) : has3BoxName ? (
        <p className="ml-4 flex-auto leading-none">
          <span className="block text-sm mb-2px font-semibold whitespace-no-wrap">
            {data.name}
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
