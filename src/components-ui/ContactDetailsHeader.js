import { Heading, Badge, Box } from "@unioncredit/ui";
import { Avatar, Copyable } from "components-ui";
import truncateAddress from "util/truncateAddress";
import { ReactComponent as External } from "@unioncredit/ui/lib/icons/external.svg";

import usePublicData from "hooks/usePublicData";
import useAddressLabels from "hooks/useAddressLabels";
import getEtherscanLink from "util/getEtherscanLink";
import useChainId from "hooks/useChainId";
import { Link } from "react-router-dom";

export function ContactDetailsHeader({ address }) {
  const chainId = useChainId();
  const { ENSName, BoxName } = usePublicData(address);
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
        <Box direction="vertical" mx="16px">
          <Link to={`/profile/${address}`}>
            <Heading level={2} mb="4px">
              {primaryLabel.label}
            </Heading>
          </Link>
          <Box>
            {(!ENSName || (ENSName && label)) && (
              <Badge
                color="grey"
                mr="4px"
                label={
                  ENSName ? (
                    <Copyable value={ENSName}>{ENSName}</Copyable>
                  ) : (
                    "No ENS"
                  )
                }
              />
            )}

            <Badge mr="4px" color="grey" label={truncatedAddress} />

            <a href={addressEtherscanLink} target="_blank" rel="noreferrer">
              <External width="24px" />
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
