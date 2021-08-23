import { Wallet as UIWallet } from "union-ui";
import useActivity from "hooks/data/useActivity";

export function Wallet(props) {
  const activity = useActivity();
  return <UIWallet {...props} indicator={activity?.length ?? 0} />;
}
