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
import { Avatar } from "components-ui";
import { toPercent } from "util/numbers";

export function ContactsSummaryRow(props) {
  const { address, vouched, utilized, onClick } = props;
  const { name, ...publicData } = usePublicData(address);

  const handleClick = () => {
    onClick({ ...props, name, ...publicData });
  };

  return (
    <TableRow onClick={onClick && handleClick}>
      <TableCell>
        <Avatar address={address} />
      </TableCell>
      <TableCell span={4}>
        <Text>{vouched} DAI</Text>
        <Label>{name}</Label>
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
