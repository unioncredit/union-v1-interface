import { Identicon } from "components-ui";
import { Avatar as UIAvatar } from "union-ui";
import use3BoxPublicData from "hooks/use3BoxPublicData";
import getIPFSAssetLink from "util/getIPFSAssetLink";

export function Avatar({ address, size }) {
  const { data, error } = use3BoxPublicData(address);
  const has3BoxProfileImage = !!data && !error && data?.image;

  return has3BoxProfileImage ? (
    <UIAvatar size={size} src={getIPFSAssetLink(data.image)} />
  ) : (
    <Identicon size={size} address={address} />
  );
}

Avatar.defaultProps = {
  size: 26,
};
