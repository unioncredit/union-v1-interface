import { Button, Heading, Text, Box } from "union-ui";
import { Avatar } from "components-ui";
import { useManageContactModal } from "components-ui/modals";
import truncateAddress from "util/truncateAddress";

import usePublicData from "hooks/usePublicData";
import useAddressLabels from "hooks/useAddressLabels";

export function ContactDetailsHeader({ address, mobile }) {
  const { ENSName, BoxName } = usePublicData(address);
  const { open: openManageContactModal } = useManageContactModal();
  const { getLabel } = useAddressLabels();
  const label = getLabel(address);

  const name = ENSName || BoxName;

  return (
    <Box
      align={mobile ? "flex-start" : "center"}
      mt={mobile && "16px"}
      mb={mobile && "16px"}
      className="contact-details-header"
    >
      <Box align="center">
        {address && <Avatar size={54} address={address} />}
        <Box direction="vertical" mx="16px">
          {label && (
            <Heading level={2} m={0}>
              {label}
            </Heading>
          )}
          <Text mb={0}>
            {name && `${name} •`} {truncateAddress(address)}
          </Text>
        </Box>
      </Box>
      <Button
        ml="auto"
        rounded
        variant="secondary"
        label="Manage contact"
        icon="manage"
        onClick={openManageContactModal}
      />
    </Box>
  );
}
