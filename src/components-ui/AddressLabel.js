import { Avatar } from "components-ui";
import { Box, Text } from "@unioncredit/ui";
import usePublicData from "hooks/usePublicData";
import truncateAddress from "util/truncateAddress";
import { Copyable } from "./Copyable";

export function AddressLabel({ address, showAddress }) {
  const { name } = usePublicData(address);

  return (
    <Box align="center">
      <Avatar address={address} />
      <Text mb="0" mx="8px">
        {name} 
        {showAddress && !name.startsWith("0x") && (
          <>
            &bull;{" "}
            <Copyable value={address}>{truncateAddress(address)}</Copyable>
          </>
        )}
      </Text>
    </Box>
  );
}
