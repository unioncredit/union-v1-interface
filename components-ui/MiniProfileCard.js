import { Box, Button, Card, Skeleton, Badge, Text, Label } from "union-ui";
import { Avatar } from "components-ui";
import Link from "next/link";
import useIsMember from "hooks/data/useIsMember";
import usePublicData from "hooks/usePublicData";
import truncateAddress from "util/truncateAddress";

export function MiniProfileCard({ address }) {
  const { data: isMember } = useIsMember(address);
  const { name, ENSName } = usePublicData(address);

  return (
    <Card variant="packed" mb="24px">
      <Card.Body>
        {address ? (
          <Box>
            <Box align="center">
              <Avatar size={32} address={address} />
              <Box direction="vertical" ml="8px">
                <Text mb={0} grey={700}>
                  {name}
                </Text>
                <Label size="small" m={0} grey={400}>
                  {ENSName ? truncateAddress(address) : "No ENS"}
                </Label>
              </Box>
            </Box>
            {isMember ? (
              <Badge label="Union Member" color="blue" ml="auto" />
            ) : (
              <Badge label="Not a Member" color="yellow" ml="auto" />
            )}
          </Box>
        ) : (
          <Box>
            <Skeleton variant="circle" size={32} grey={200} mr="8px" />
            <Box direction="vertical">
              <Skeleton width={70} height={16} grey={200} mb="4px" />
              <Skeleton width={70} height={12} grey={100} />
            </Box>
            <Skeleton width={93} height={24} grey={200} ml="auto" />
          </Box>
        )}
        <Link href={`/profile/${address}`}>
          <Button
            mt="14px"
            variant="secondary"
            disabled={!address}
            label="View Profile"
            icon="external"
            iconPosition="end"
            fluid
          />
        </Link>
      </Card.Body>
    </Card>
  );
}
