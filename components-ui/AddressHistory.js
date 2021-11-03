import { TransactionHistory } from "components-ui";
import useAddressHistory from "hooks/data/useAddressHistory";

export function AddressHistory({ address }) {
  const { data } = useAddressHistory(address);
  return <TransactionHistory data={data} />;
}
