import Link from "next/link";
import { Button, Heading, Badge, Box } from "union-ui";
import { Avatar, Copyable } from "components-ui";
import truncateAddress from "util/truncateAddress";

import usePublicData from "hooks/usePublicData";
import useAddressLabels from "hooks/useAddressLabels";

export function ContactDetailsHeader({ address, isOverdue }) {
  const { ENSName, BoxName } = usePublicData(address);
  const { getLabel } = useAddressLabels();
  const label = getLabel(address);

  const truncatedAddress = (
    <Copyable value={address}>{truncateAddress(address)}</Copyable>
  );

  const [label1] = [label, ENSName || BoxName, truncatedAddress].filter(
    Boolean
  );

  return (
    <Box mb="24px" align="center">
      <Box align="center">
        {address && <Avatar size={54} address={address} />}
        <Box direction="vertical" mx="16px">
          <Heading level={2} mb="4px">
            {label1}
          </Heading>
          <Box>
            <Badge
              color="grey"
              label={<Copyable value={address}>{address.slice(0, 6)}</Copyable>}
            />
            <Badge
              ml="7px"
              color={isOverdue ? "red" : "blue"}
              label={isOverdue ? "Overdue" : "Healthy"}
            />
          </Box>
        </Box>
      </Box>
      <Link href={`/profile/${address}`}>
        <Button
          ml="auto"
          rounded
          variant="secondary"
          label="View Profile"
          icon="external"
          iconPosition="end"
        />
      </Link>
    </Box>
  );
}
