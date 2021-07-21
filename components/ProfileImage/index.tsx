import type { IPFSImage } from "hooks/use3BoxPublicData";
import getIPFSAssetLink from "util/getIPFSAssetLink";

const ProfileImage = ({
  image,
  size = 32,
  alt,
}: {
  image: [IPFSImage];
  size: 18 | 32 | 72;
  alt: string;
}) => {
  return (
    <img
      loading="lazy"
      className="rounded-full object-cover object-center align-middle"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      src={getIPFSAssetLink(image)}
      alt={alt}
    />
  );
};

export default ProfileImage;
