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

export function ContactsSummaryRow(props) {
  const { address, vouched, utilized, onClick } = props;
  const { name, ...publicData } = usePublicData(address);
  const { getLabel } = useAddressLabels();

  const handleClick = () => {
    onClick({ ...props, name, ...publicData });
  };

  const label = getLabel(address);

  return (
    <TableRow onClick={onClick && handleClick}>
      <TableCell span={4}>
        <Box align="center">
          <Avatar address={address} />
          <Box direction="vertical" ml="16px">
            <Text>
              <Dai value={vouched} />
            </Text>
            <Label>
              {name} {label && `• ${label}`}
            </Label>
          </Box>
        </Box>
      </TableCell>
      <TableCell span={1} align="right">
        <Label as="p" size="small" mb="6px">
          {toPercent(utilized)} Utilized
        </Label>
        <Bar percentage={utilized * 100} />
      </TableCell>
    </TableRow>
  );
}

export function ContactsSummaryRowSkeleton() {
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
