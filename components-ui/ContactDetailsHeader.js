import Link from "next/link";
import { Heading, Badge, Box } from "union-ui";
import { Avatar, Copyable } from "components-ui";
import truncateAddress from "util/truncateAddress";
import External from "union-ui/lib/icons/external.svg";

import usePublicData from "hooks/usePublicData";
import useAddressLabels from "hooks/useAddressLabels";

export function ContactDetailsHeader({ address }) {
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

            <Link href={`/profile/${address}`}>
              <External width="24px" />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
