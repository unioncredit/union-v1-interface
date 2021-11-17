import { useState } from "react";
import { Avatar as UIAvatar } from "union-ui";
import useENSName from "hooks/useENSName";
import useENSImage from "hooks/useENSImage";
import makeBlockie from "ethereum-blockies-base64";

export function Avatar({ address, size }) {
  const [error, setError] = useState(false);
  const ENSName = useENSName(address);
  const image = useENSImage(ENSName);
  const blockie = makeBlockie(address);

  return (
    <UIAvatar
      size={size}
      src={error ? blockie : image || blockie}
      onError={() => setError(true)}
    />
  );
}

Avatar.defaultProps = {
  size: 26,
};
