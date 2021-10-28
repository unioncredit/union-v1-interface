import { Button } from "union-ui";
import { useForceConnect } from "hooks/useForceConnect";

export function ConnectButton(props) {
  const [, set] = useForceConnect();

  const handleConnect = () => {
    set(true);
  };

  return <Button label="Connect wallet" {...props} onClick={handleConnect} />;
}
