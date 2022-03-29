import usePublicData from "hooks/usePublicData";
import {
  Text,
  TableCell,
  TableRow,
  Skeleton,
  Box,
  Badge,
} from "@unioncredit/ui";
import { Avatar, Dai } from "components-ui";
import useAddressLabels from "hooks/useAddressLabels";
import { ContactsType } from "constants/app";
import format from "util/formatValue";
import truncateName from "util/truncateName";

export function ContactsListItem(props) {
  const { address, trust, onClick, isOverdue, variant, active, isMember } =
    props;
  const { name, ENSName, BoxName, ...publicData } = usePublicData(address);
  const { getLabel } = useAddressLabels();

  const label = getLabel(address);

  const handleClick = (event) => {
    if (typeof onClick === "function") {
      onClick(event, { ...props, name, ...publicData });
    }
  };

  const [primaryLabel] = [label, ENSName || BoxName, name].filter((label) =>
    Boolean(label)
  );

  return (
    <TableRow
      onClick={handleClick}
      active={active}
      error={isOverdue && variant === ContactsType.YOU_TRUST}
    >
      <TableCell span={4}>
        <Box align="center">
          <Avatar address={address} />
          <Text grey={700} ml="8px">
            {truncateName(primaryLabel)}
          </Text>
        </Box>
      </TableCell>
      <TableCell align="right">
        <Text>
          <Dai value={format(trust, 2)} />
        </Text>
      </TableCell>
      {variant === ContactsType.YOU_TRUST && (
        <TableCell align="right" className="hide-lt-600">
          {!isMember ? (
            <Badge color="grey" label="Not a member" />
          ) : isOverdue ? (
            <Badge color="red" label="Overdue" />
          ) : (
            <Badge color="blue" label="Healthy" />
          )}
        </TableCell>
      )}
    </TableRow>
  );
}

export function ContactsListItemSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Box align="center">
          <Skeleton shimmer variant="circle" size={24} grey={200} />
          <Skeleton shimmer width={100} height={10} ml="16px" grey={200} />
        </Box>
      </TableCell>
      <TableCell span={1}>
        <Skeleton shimmer width={40} height={10} ml="auto" grey={200} />
      </TableCell>
    </TableRow>
  );
}
