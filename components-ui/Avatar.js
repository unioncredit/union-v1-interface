import { Avatar as UIAvatar } from "union-ui";
import use3BoxPublicData from "hooks/use3BoxPublicData";
import getIPFSAssetLink from "util/getIPFSAssetLink";
import Identicon from "react-identicons";

export function Avatar({ address, size }) {
  const { data, error } = use3BoxPublicData(address);
  const has3BoxProfileImage = !!data && !error && data?.image;

  const fg = `#${address.slice(2, 8)}`;
  const bg = `${fg}55`;

  return has3BoxProfileImage ? (
    <UIAvatar size={size} src={getIPFSAssetLink(data.image)} />
  ) : (
    <Identicon size={size} string={address} fg={fg} bg={bg} />
  );
}

Avatar.defaultProps = {
  size: 26,
};
