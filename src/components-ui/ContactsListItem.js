import { Text, TableCell, TableRow, Skeleton, Label } from "@unioncredit/ui";
import { formatUnits } from "@ethersproject/units";

import { Avatar } from "components-ui";
import useAddressLabels from "hooks/useAddressLabels";
import usePublicData from "hooks/usePublicData";
import { ContactsType } from "constants/app";
import format from "util/formatValue";
import truncateName from "util/truncateName";
import truncateAddress from "util/truncateAddress";
import { StatusBadge } from "./StatusBadge";

export function ContactsListItem(props) {
  const { address, trust, onClick, isOverdue, variant, active } = props;

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
      {variant === ContactsType.YOU_TRUST && (
        <TableCell align="center" className="hide-lt-400">
          <StatusBadge address={address} />
        </TableCell>
      )}
      <TableCell align="right">
        <Text>{format(formatUnits(trust, 18), 2)}</Text>
      </TableCell>
    </TableRow>
  );
}

export function ContactsListItemSkeleton({ variant }) {
  return (
    <TableRow>
      <TableCell fixedSize>
        <Skeleton shimmer variant="circle" size={24} grey={200} />
      </TableCell>
      <TableCell>
        <Skeleton shimmer width={100} height={10} grey={200} />
      </TableCell>
      <TableCell>
        <Skeleton shimmer width={100} height={10} ml="auto" grey={200} />
      </TableCell>
      {variant === ContactsType.YOU_TRUST && (
        <TableCell>
          <Skeleton
            shimmer
            width={40}
            height={10}
            ml="auto"
            grey={200}
            className="hide-lt-400"
          />
        </TableCell>
      )}
    </TableRow>
  );
}
