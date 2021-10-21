import Link from "next/link";
import { Button, Heading, Badge, Box } from "union-ui";
import { Avatar, Copyable } from "components-ui";
import truncateAddress from "util/truncateAddress";

import usePublicData from "hooks/usePublicData";
import useAddressLabels from "hooks/useAddressLabels";
import { ContactsType } from "constants/app";

export function ContactDetailsHeader({ address, isOverdue, contactsType }) {
  const { ENSName, BoxName } = usePublicData(address);
  const { getLabel } = useAddressLabels();
  const label = getLabel(address);

  const truncatedAddress = (
    <Copyable value={address}>{truncateAddress(address)}</Copyable>
  );

  const [primaryLabel, ...labels] = [
    { label },
    { label: ENSName || BoxName },
    { label: truncatedAddress, value: address },
  ].filter(({ label }) => Boolean(label));

  const isYouTrust = contactsType === ContactsType.YOU_TRUST;

  return (
    <Box mb="24px" align="center">
      <Box align="center">
        {address && <Avatar size={54} address={address} />}
        <Box direction="vertical" mx="16px">
          <Heading level={2} mb="4px">
            <Copyable value={primaryLabel.value || primaryLabel.label}>
              {primaryLabel.label}
            </Copyable>
          </Heading>
          <Box>
            {!ENSName && <Badge color="grey" mr="4px" label="No ENS" />}

            {labels.map(({ value, label }) => (
              <Badge
                key={label}
                mr="4px"
                color="grey"
                label={<Copyable value={value || label}>{label}</Copyable>}
              />
            ))}

            {isYouTrust && (
              <Badge
                ml="7px"
                color={isOverdue ? "red" : "blue"}
                label={isOverdue ? "Overdue" : "Healthy"}
              />
            )}
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
