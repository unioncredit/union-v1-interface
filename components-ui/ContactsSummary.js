import usePublicData from "hooks/usePublicData";
import {
  Text,
  TableCell,
  TableRow,
  Bar,
  Label,
  Avatar as UIAvatar,
  Skeleton,
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
      <TableCell>
        <Avatar address={address} />
      </TableCell>
      <TableCell span={4}>
        <Text>
          <Dai value={vouched} />
        </Text>
        <Label>
          {name} {label && `• ${label}`}
        </Label>
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
        <UIAvatar />
      </TableCell>
      <TableCell span={1}>
        <Skeleton size="medium" variant="primary" />
        <Skeleton size="small" variant="secondary" />
      </TableCell>
      <TableCell span={1} align="right">
        <Skeleton size="small" variant="secondary" />
      </TableCell>
    </TableRow>
  );
}
