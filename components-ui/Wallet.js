import { useWeb3React } from "@web3-react/core";
import { Wallet as UIWallet } from "union-ui";
import { networkImages } from "lib/connectors";

export function Wallet(props) {
  const { chainId } = useWeb3React();
  return <UIWallet {...props} networkSrc={networkImages[chainId]} />;
}
