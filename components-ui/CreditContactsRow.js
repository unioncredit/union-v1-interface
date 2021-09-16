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
} from "union-ui";
import { Avatar, Dai } from "components-ui";
import { toPercent } from "util/numbers";
import useAddressLabels from "hooks/useAddressLabels";

export function CreditContactsRow(props) {
  const { address, vouched, utilized, onClick, valueCaption } = props;
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
      <TableCell>
        <Box align="center">
          <Avatar address={address} />
          <Text ml="8px">
            {name} {label && <>&bull; {label}</>}
          </Text>
        </Box>
      </TableCell>
      <TableCell align="right">
        <Text grey={700}>
          <Dai value={vouched} /> {valueCaption}
        </Text>
      </TableCell>
    </TableRow>
  );
}

export function CreditContactsRowSkeleton() {
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
