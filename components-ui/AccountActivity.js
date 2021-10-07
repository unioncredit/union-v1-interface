import { useWeb3React } from "@web3-react/core";
import usePublicData from "hooks/usePublicData";
import { Fragment } from "react";
import {
  Skeleton,
  Text,
  Table,
  TableCell,
  TableRow,
  Badge,
  Box,
  Borrow,
  NewVouch,
  NewMember,
  EmptyState,
} from "union-ui";
import createArray from "util/createArray";
import formatDateTime from "util/formatDateTime";
import { Dai } from "./Dai";

const UpdateTrustActivity = ({
  borrower,
  ts,
  staker,
  trustAmount,
  account,
}) => {
  const { name: borrowerName } = usePublicData(borrower);
  const { name: stakerName } = usePublicData(staker);

  const isVouch = staker !== account;

  return (
    <TableRow>
      <TableCell>
        <Box>
          {isVouch ? <NewVouch /> : <Borrow />}
          <Text ml="8px">
            {isVouch ? `Trusted ${borrowerName}` : `Trusted by ${stakerName}`}
          </Text>
        </Box>
      </TableCell>
      <TableCell>
        <Badge color="grey" label={formatDateTime(ts)} />
      </TableCell>
      <TableCell>
        <Dai value={trustAmount} />
      </TableCell>
    </TableRow>
  );
};

const RegisterMemberActivity = ({ ts }) => {
  return (
    <TableRow>
      <TableCell>
        <Box>
          <NewMember />
          <Text ml="8px">Became a member</Text>
        </Box>
      </TableCell>
      <TableCell span={2}>
        <Badge color="grey" label={formatDateTime(ts)} />
      </TableCell>
    </TableRow>
  );
};

export function AccountActivity({
  data,
  isLoading,
  isEmpty,
  loadingCount = 1,
}) {
  const { account } = useWeb3React();

  return (
    <>
      {isEmpty ? (
        <EmptyState label="No account history" />
      ) : (
        <Table>
          {data?.map((item, i) => {
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
              <TableRow key={i}>
                <TableCell>
                  <Box align="center">
                    <Skeleton shimmer variant="circle" size={24} grey={200} />
                    <Skeleton
                      shimmer
                      width={120}
                      height={10}
                      grey={200}
                      ml="8px"
                    />
                  </Box>
                </TableCell>
                <TableCell span={2}>
                  <Skeleton shimmer width={80} height={10} grey={200} />
                </TableCell>
              </TableRow>
            ))}
        </Table>
      )}
    </>
  );
}
