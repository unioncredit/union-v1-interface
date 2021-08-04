import useENSName from "hooks/useENSName";
import { Identicon } from "components-ui";
import { Box, Avatar, Text } from "union-ui";
import use3BoxPublicData from "hooks/use3BoxPublicData";
import getIPFSAssetLink from "util/getIPFSAssetLink";

function truncate(text) {
  if (text.startsWith("0x")) {
    return `${text.slice(0, 6)}...${text.slice(-6)}`;
  }
  return text;
}

export function AddressLabel({ address }) {
  const ENSName = useENSName(address);
  const hasENSName = !!ENSName;

  const { data, error } = use3BoxPublicData(address);
  const has3BoxName = !!data && !error && data?.name;
  const has3BoxProfileImage = !!data && !error && data?.image;

  return (
    <Box align="center">
      {has3BoxProfileImage ? (
        <Avatar src={getIPFSAssetLink(data.image)} />
      ) : (
        <Identicon address={address} />
      )}
      <Text mb="0" mx="8px">
        {hasENSName ? ENSName : has3BoxName ? data.name : truncate(address)}
      </Text>
    </Box>
  );
}
