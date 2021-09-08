import { useWeb3React } from "@web3-react/core";
import usePublicData from "hooks/usePublicData";
import { Fragment } from "react";
import { Box, Skeleton, Text, StatusIcon, Label } from "union-ui";
import createArray from "util/createArray";
import { Dai } from "./Dai";

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
          {borrower === account ? "you" : borrowerName} with{" "}
          <Dai value={trustAmount} />
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

export function AccountActivity({
  data,
  isLoading,
  isEmpty,
  loadingCount = 1,
  limit,
  related,
}) {
  const { account } = useWeb3React();

  const items = isNaN(limit) ? data : data?.slice(0, limit);

  const filteredItems = items.filter((item) =>
    [item.borrower, item.staker].includes(account)
  );

  return (
    <>
      {isEmpty ? (
        <Text>No history</Text>
      ) : (
        <div className="account-activity">
          <div className="account-activity-inner">
            {(related ? filteredItems : items)?.map((item, i) => {
              const renderItem = () => {
                if (item.type === "UpdateTrust") {
                  return <UpdateTrustActivity {...item} account={account} />;
                } else if (item.type === "RegisterMember") {
                  return <RegisterMemberActivity {...item} account={account} />;
                }
              };

              return (
                <Fragment key={`account-activity-item-${i}`}>
                  {renderItem()}
                </Fragment>
              );
            })}

            {isLoading &&
              loadingCount > 0 &&
              createArray(loadingCount).map((_, i) => (
                <Box
                  justify="space-between"
                  align="center"
                  mt="8px"
                  w="100%"
                  key={`loading-activity-${i}`}
                >
                  <Box direction="vertical" w="100%">
                    <Skeleton size="small" variant="secondary" w="30%" />
                    <Skeleton size="medium" variant="secondary" w="50%" />
                  </Box>
                </Box>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
