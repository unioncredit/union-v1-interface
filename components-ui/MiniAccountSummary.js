import { Box, Skeleton, Badge, Text, Label, BadgeRow } from "@unioncredit/ui";
import { Avatar } from "components-ui";
import useIsMember from "hooks/data/useIsMember";
import usePublicData from "hooks/usePublicData";
import truncateAddress from "util/truncateAddress";
import { useRouter } from "next/router";
import useVouchData from "hooks/data/useVouchData";
import { useWeb3React } from "@web3-react/core";

export function MiniAccountSummary({ address, onClick }) {
  const router = useRouter();
  const { account } = useWeb3React();
  const { data: isMember } = useIsMember(address);
  const { data: vouchData = [] } = useVouchData(address);
  const { name, ENSName } = usePublicData(address);

  const handleClick = () => {
    onClick && onClick();
    router.push(`/profile/${address}`);
  };

  const isVouchingFor = vouchData.find(
    (x) => x.address.toLowerCase() === account.toLowerCase()
  );

  if (!address) {
    return (
      <Box direction="vertical">
        <Box mt="2px">
          <Skeleton variant="circle" size={32} grey={200} mr="8px" />
          <Box direction="vertical">
            <Skeleton width={80} height={18} grey={200} mb="4px" />
            <Skeleton width={70} height={12} grey={100} />
          </Box>
        </Box>
        <Box mt="8px" mb="16px">
          <Skeleton width={72} height={18} grey={100} />
          <Skeleton width={72} height={18} grey={100} ml="4px" />
        </Box>
      </Box>
    );
  }

  return (
    <Box direction="vertical">
      <Box align="center">
        <Avatar size={32} address={address} onClick={handleClick} />
        <Box direction="vertical" ml="8px">
          <Text mb={0} grey={700}>
            {name}
          </Text>
          <Label size="small" m={0} grey={400}>
            {ENSName ? truncateAddress(address) : "No ENS"}
          </Label>
        </Box>
      </Box>
      <BadgeRow mt="8px" mb="16px">
        {isVouchingFor && <Badge label="You’re Vouching" color="green" />}

        {isMember ? (
          <Badge label="Union Member" color="blue" />
        ) : (
          <Badge label={`${vouchData.length} Vouches`} color="grey" />
        )}
      </BadgeRow>
    </Box>
  );
}
