import { Avatar } from "components-ui";
import { Box, Text } from "union-ui";
import usePublicData from "hooks/usePublicData";

export function AddressLabel({ address }) {
  const { name } = usePublicData(address);

  return (
    <Box align="center">
      <Avatar address={address} />
      <Text mb="0" mx="8px">
        {name}
      </Text>
    </Box>
  );
}
