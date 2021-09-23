import usePublicData from "hooks/usePublicData";
import {
  Text,
  TableCell,
  TableRow,
  Avatar as UIAvatar,
  Skeleton,
  Box,
  Badge,
} from "union-ui";
import { Avatar, Dai } from "components-ui";
import useAddressLabels from "hooks/useAddressLabels";
import { ContactsType } from "views/contacts/config";

export function ContactsListItem(props) {
  const { address, vouched, onClick, isOverdue, variant, active } = props;
  const { name, ...publicData } = usePublicData(address);
  const { getLabel } = useAddressLabels();

  const label = getLabel(address);

  const handleClick = (event) => {
    if (typeof onClick === "function") {
      onClick(event, { ...props, name, ...publicData });
    }
  };

  return (
    <TableRow onClick={handleClick} active={active} error={isOverdue}>
      <TableCell span={4}>
        <Box align="center">
          <Avatar address={address} />
          <Text grey={700} ml="8px">
            {name} {label && <>&bull; {label}</>}
          </Text>
        </Box>
      </TableCell>
      <TableCell align="right">
        <Text>
          <Dai value={vouched} />
        </Text>
      </TableCell>
      {variant === ContactsType.YOU_TRUST && (
        <TableCell align="right">
          {isOverdue ? (
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
        <Box>
          <UIAvatar />
          <Box direction="vertical" ml="16px">
            <Skeleton size="medium" variant="primary" />
            <Skeleton size="small" variant="secondary" />
          </Box>
        </Box>
      </TableCell>
      <TableCell span={1} align="right">
        <Skeleton size="small" variant="secondary" />
      </TableCell>
    </TableRow>
  );
}
