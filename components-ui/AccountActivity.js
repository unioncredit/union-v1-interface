import { useWeb3React } from "@web3-react/core";
import usePublicData from "hooks/usePublicData";
import { Box, Skeleton, Text, StatusIcon, Label } from "union-ui";

const UpdateTrustActivity = ({
  borrower,
  date,
  staker,
  trustAmount,
  account,
}) => {
  const { name: borrowerName } = usePublicData(borrower);
  const { name: stakerName } = usePublicData(staker);

  return (
    <Box align="center" justify="space-between" mt="10px">
      <Box direction="vertical">
        <Text>
          {staker === account ? "you" : stakerName} trusts{" "}
          {borrower === account ? "you" : borrowerName} with {trustAmount}
        </Text>
        <Label size="small">{date}</Label>
      </Box>
      <StatusIcon variant="wire" name="success" />
    </Box>
  );
};

const RegisterMemberActivity = ({ date }) => {
  return (
    <Box align="center" justify="space-between" mt="10px">
      <Text>Registered • {date}</Text>
      <StatusIcon variant="wire" name="success" />
    </Box>
  );
};

export function AccountActivity({ data }) {
  const { account } = useWeb3React();

  return (
    <>
      <Box align="center" justify="space-between" mt="20px" mb="16px">
        <Text m={0} size="large">
          Transactions
        </Text>
      </Box>
      {data ? (
        data.slice(0, 5).map((item) => {
          if (item.type === "UpdateTrust") {
            return <UpdateTrustActivity {...item} account={account} />;
          } else if (item.type === "RegisterMember") {
            return <RegisterMemberActivity {...item} account={account} />;
          }
        })
      ) : (
        <Box justify="space-between" align="center">
          <Box direction="vertical">
            <Skeleton size="small" />
            <Skeleton size="medium" variant="secondary" />
          </Box>
          <Box direction="vertical">
            <Skeleton size="small" variant="secondary" />
            <Skeleton size="small" variant="secondary" />
          </Box>
        </Box>
      )}
    </>
  );
}
