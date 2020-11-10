import Image from "next/image";
import getIPFSAssetLink from "util/getIPFSAssetLink";

/**
 * @name ProfileImage
 *
 * @param {Object} props
 * @param {Array} props.image
 * @param {(18|32|72)} props.size
 */
const ProfileImage = ({ image, size = 32, ...rest }) => {
  return (
    <Image
      loading="lazy"
      className="rounded-full object-cover object-center align-middle"
      width={size}
      height={size}
      src={getIPFSAssetLink(image)}
      {...rest}
    />
  );
};

export default ProfileImage;
