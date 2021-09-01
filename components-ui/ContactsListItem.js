import usePublicData from "hooks/usePublicData";
import {
  Text,
  TableCell,
  TableRow,
  Bar,
  Label,
  Avatar as UIAvatar,
  Skeleton,
  Box,
  Badge,
} from "union-ui";
import { Avatar, Dai } from "components-ui";
import { toPercent } from "util/numbers";
import useAddressLabels from "hooks/useAddressLabels";
import format from "util/formatValue";
import { ContactsType } from "views/contacts/config";

export function ContactsListItem(props) {
  const { address, vouched, utilized, onClick, isOverdue, used, variant } =
    props;
  const { name, ...publicData } = usePublicData(address);
  const { getLabel } = useAddressLabels();

  const label = getLabel(address);

  const handleClick = (event) => {
    if (typeof onClick === "function") {
      onClick(event, { ...props, name, ...publicData });
    }
  };

  return (
    <TableRow onClick={handleClick}>
      <TableCell span={4}>
        <Box align="center">
          <Avatar address={address} />
          <Box direction="vertical" ml="16px">
            <Text grey={700} mt="5px">
              {name} {label && <>&bull; {label}</>}
            </Text>
            <Label size="small">
              <Dai value={vouched} /> Limit
            </Label>
          </Box>
        </Box>
      </TableCell>
      <TableCell span={1} align="right">
        {variant === ContactsType.TRUSTS_YOU ? (
          <>
            <Bar percentage={utilized * 100} />
            <Label as="p" size="small" mt="6px">
              Utilizing {toPercent(utilized)}
            </Label>
          </>
        ) : (
          <>
            {isOverdue ? (
              <Badge color="red" label="Overdue" />
            ) : (
              <Badge color="blue" label="Healthy" />
            )}
            <Label size="small" as="p" mt="4px" grey={700}>
              <Dai value={format(used)} /> owed
            </Label>
          </>
        )}
      </TableCell>
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
