import { Text } from "union-ui";
import { NetworkSelect } from "components-ui";

export function NetworkSwitcher() {
  return (
    <>
      <Text>You are connected to an unknown network.</Text>
      <NetworkSelect />
    </>
  );
}
