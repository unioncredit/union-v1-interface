import {
  Box,
  Button,
  Card,
  Skeleton,
  Badge,
  Text,
  Label,
} from "@unioncredit/ui";
import { Avatar } from "components-ui";
import useIsMember from "hooks/data/useIsMember";
import usePublicData from "hooks/usePublicData";
import {useNavigate} from "react-router-dom";
import truncateAddress from "util/truncateAddress";

export function MiniProfileCard({ address, onClick }) {
  const navigate = useNavigate();
  const { data: isMember } = useIsMember(address);
  const { name, ENSName } = usePublicData(address);

  const handleClick = () => {
    onClick && onClick();
    navigate(`/profile/${address}`);
  };

  return (
    <Card packed mb="24px">
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
          <Box mb="16px" mt="2px">
            <Skeleton variant="circle" size={32} grey={200} mr="8px" />
            <Box direction="vertical">
              <Skeleton width={80} height={18} grey={200} mb="4px" />
              <Skeleton width={70} height={12} grey={100} />
            </Box>
            <Skeleton width={93} height={24} grey={200} ml="auto" />
          </Box>
        )}
        <Button
          mt="14px"
          variant="secondary"
          disabled={!address}
          label="View Profile"
          iconPosition="end"
          onClick={handleClick}
          fluid
        />
      </Card.Body>
    </Card>
  );
}
