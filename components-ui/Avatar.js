import { Identicon } from "components-ui";
import { Avatar as UIAvatar } from "union-ui";
import use3BoxPublicData from "hooks/use3BoxPublicData";
import getIPFSAssetLink from "util/getIPFSAssetLink";

export function Avatar({ address }) {
  const { data, error } = use3BoxPublicData(address);
  const has3BoxProfileImage = !!data && !error && data?.image;

  return has3BoxProfileImage ? (
    <UIAvatar src={getIPFSAssetLink(data.image)} />
  ) : (
    <Identicon size={26} address={address} />
  );
}

