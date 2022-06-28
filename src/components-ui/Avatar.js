import { useState } from "react";
import { Avatar as UIAvatar } from "@unioncredit/ui";
import makeBlockie from "ethereum-blockies-base64";
import useENS from "hooks/useENS";

export function Avatar({ address, size }) {
  const [error, setError] = useState(false);
  const ens = useENS(address);

  const blockie = makeBlockie(address);

  return (
    <UIAvatar
      size={size}
      src={error ? blockie : ens.avatar || blockie}
      onError={() => setError(true)}
    />
  );
}

Avatar.defaultProps = {
  size: 26,
};
