import usePublicData from "hooks/usePublicData";
import {
  Heading,
  Text,
  Table,
  TableCell,
  TableRow,
  Bar,
  Button,
  Label,
  Avatar as UIAvatar,
  Skeleton,
} from "union-ui";
import { Avatar } from "components-ui";
import createArray from "util/createArray";

function ContactsSummaryRow({ address, vouched, utilized }) {
  const { name } = usePublicData(address);

  return (
    <TableRow>
      <TableCell>
        <Avatar address={address} />
      </TableCell>
      <TableCell span={4}>
        <Text>{vouched} DAI</Text>
        <Label>{name}</Label>
      </TableCell>
      <TableCell span={1} align="right">
        <Label as="p" size="small" mb="6px">
          {utilized}% Utilized
        </Label>
        <Bar size="small" percentage={utilized} />
      </TableCell>
    </TableRow>
  );
}

function ContactsSummaryRowSkeleton() {
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

export function ContactsSummary({ data }) {
  const isLoading = !data;

  return (
    <Table>
      {isLoading
        ? createArray(3).map(() => <ContactsSummaryRowSkeleton />)
        : data.map((item) => <ContactsSummaryRow {...item} />)}
      <TableRow>
        <TableCell align="right" span={1}>
          <Button
            inline
            label="All contacts"
            variant="pill"
            icon="chevron"
            iconPosition="end"
          />
        </TableCell>
      </TableRow>
    </Table>
  );
}
