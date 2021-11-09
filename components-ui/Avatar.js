import { useState } from "react";
import { Avatar as UIAvatar } from "union-ui";
import Identicon from "react-identicons";
import useENSName from "hooks/useENSName";
import useENSImage from "hooks/useENSImage";

export function Avatar({ address, size }) {
  const [error, setError] = useState(false);
  const ENSName = useENSName(address);
  const image = useENSImage(ENSName);

  const fg = `#${address.slice(2, 8)}`;
  const bg = `${fg}55`;

  const hasENSImage = !!image;

  return hasENSImage && !error ? (
    <UIAvatar size={size} src={image} onError={() => setError(true)} />
  ) : (
    <Identicon size={size} string={address} fg={fg} bg={bg} />
  );
}

Avatar.defaultProps = {
  size: 26,
};
