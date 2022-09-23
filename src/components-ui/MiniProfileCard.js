import { Link } from "react-router-dom";
import { Heading, Badge, Box, BadgeRow } from "@unioncredit/ui";
import { ReactComponent as External } from "@unioncredit/ui/lib/icons/external.svg";

import { Avatar, Copyable } from "components-ui";
import getEtherscanLink from "util/getEtherscanLink";
import truncateAddress from "util/truncateAddress";
import useChainId from "hooks/useChainId";
import usePublicData from "hooks/usePublicData";
import useIsMember from "hooks/data/useIsMember";
import useIsOverdue from "hooks/data/useIsOverdue";
import useAddressLabels from "hooks/useAddressLabels";

export function MiniProfileCard({ address }) {
  const chainId = useChainId();
  const { ENSName, BoxName } = usePublicData(address);
  const { data: isMember } = useIsMember(address);
  const { data: isOverdue } = useIsOverdue(address);

  const { getLabel } = useAddressLabels();
  const label = getLabel(address);

  const truncatedAddressText = truncateAddress(address);

  const truncatedAddress = (
    <Copyable value={address}>{truncatedAddressText}</Copyable>
  );

  const [primaryLabel] = [
    { label },
    { label: ENSName || BoxName },
    { label: truncatedAddressText, value: address },
  ].filter(({ label }) => Boolean(label));

  const addressEtherscanLink = getEtherscanLink(chainId, address, "ADDRESS");

  return (
    <Box mb="24px" align="center">
      <Box align="center">
        {address && (
          <Link to={`/profile/${address}`}>
            <Avatar size={54} address={address} />
          </Link>
        )}
        <Box direction="vertical" mx="12px">
          <Link to={`/profile/${address}`}>
            <Heading level={2} mb="4px">
              {primaryLabel.label}
            </Heading>
          </Link>
          <Box>
            <BadgeRow>
              <Badge mr="4px" color="grey" label={truncatedAddress} />

              {isMember ? (
                <Badge
                  color={isOverdue ? "red" : "blue"}
                  label={isOverdue ? "Overdue" : "Healthy"}
                />
              ) : (
                <Badge color="purple" label="Not a member" />
              )}
            </BadgeRow>

            <a href={addressEtherscanLink} target="_blank" rel="noreferrer">
              <External width="24px" />
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
