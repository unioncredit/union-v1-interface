import { forwardRef } from "react";
import { formatUnits } from "@ethersproject/units";
import { Text, TableCell, TableRow, Skeleton, Label } from "@unioncredit/ui";

import format from "util/formatValue";
import { Avatar, Dai } from "components-ui";
import usePublicData from "hooks/usePublicData";
import useAddressLabels from "hooks/useAddressLabels";
import truncateName from "util/truncateName";
import truncateAddress from "util/truncateAddress";

export const CreditContactsRow = forwardRef((props, ref) => {
  const { address, trust, onClick } = props;
  const { name, ENSName } = usePublicData(address);
  const { getLabel } = useAddressLabels();

  const label = getLabel(address);

  const handleClick = (event) => {
    if (typeof onClick === "function") {
      onClick(event, { ...props, name, ENSName });
    }
  };

  const [primaryLabel] = [label, ENSName, name].filter((label) =>
    Boolean(label)
  );

  return (
    <TableRow onClick={onClick && handleClick} ref={ref}>
      <TableCell fixedSize>
        <Avatar address={address} />
      </TableCell>
      <TableCell>
        <Label as="p" grey={700} m={0}>
          {truncateName(primaryLabel)}
        </Label>
        <Label as="p" size="small" grey={400} m={0}>
          {truncateAddress(address)}
        </Label>
      </TableCell>
      <TableCell align="right">
        <Text grey={700}>{format(formatUnits(trust), 2)}</Text>
      </TableCell>
    </TableRow>
  );
});

export function CreditContactsRowSkeleton() {
  return (
    <TableRow>
      <TableCell fixedSize>
        <Skeleton variant="circle" size={24} grey={200} />
      </TableCell>
      <TableCell span={2}>
        <Skeleton width={100} height={10} grey={200} ml="8px" />
      </TableCell>
      <TableCell>
        <Skeleton width={30} height={10} grey={200} ml="auto" />
      </TableCell>
    </TableRow>
  );
}
