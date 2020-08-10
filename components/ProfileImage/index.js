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
    <img
      async
      className="rounded-full object-cover object-center align-middle"
      decoding="async"
      loading="lazy"
      src={getIPFSAssetLink(image)}
      style={{
        height: size,
        width: size,
      }}
      {...rest}
    />
  );
};

export default ProfileImage;
