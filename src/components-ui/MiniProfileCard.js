import { Link } from "react-router-dom";
import { Heading, Badge, Box, BadgeRow } from "@unioncredit/ui";
import { ReactComponent as External } from "@unioncredit/ui/lib/icons/external.svg";

import { Avatar, Copyable, StatusBadge } from "components-ui";
import getEtherscanLink from "util/getEtherscanLink";
import truncateAddress from "util/truncateAddress";
import useChainId from "hooks/useChainId";
import usePublicData from "hooks/usePublicData";
import useAddressLabels from "hooks/useAddressLabels";

export function MiniProfileCard({ address }) {
  const chainId = useChainId();
  const { ENSName } = usePublicData(address);

  const { getLabel } = useAddressLabels();
  const label = getLabel(address);

  const truncatedAddressText = truncateAddress(address);

  const truncatedAddress = (
    <Copyable value={address}>{truncatedAddressText}</Copyable>
  );

  const [primaryLabel] = [
    { label },
    { label: ENSName },
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
            <Box>
              <Heading level={2} mb="4px">
                {primaryLabel.label}{" "}
              </Heading>
              {ENSName && label && (
                <Heading level={2} ml="4px" mb="4px" grey={500}>
                  {`· ${ENSName}`}
                </Heading>
              )}
            </Box>
          </Link>
          <Box>
            <BadgeRow>
              <Badge mr="4px" color="grey" label={truncatedAddress} />
              <StatusBadge address={address} />
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
