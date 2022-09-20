import { useWeb3React } from "@web3-react/core";
import { NetworkSwitcher, NetworkButton } from "@unioncredit/ui";

import useChainId from "hooks/useChainId";

import { switchChain, options } from "util/switchChain";

const networkOptions = options.map((x) => ({ ...x, as: NetworkButton }));

export function NetworkSelect() {
  const chainId = useChainId();
  const { library } = useWeb3React();

  const defaultValue = options.find((option) => option.chainId === chainId);

  const handleChangeNetwork = async (value) => {
    await switchChain(value, library.provider);
  };

  if (!library) return null;

  return (
    <NetworkSwitcher
      selected={defaultValue}
      options={networkOptions}
      onChange={handleChangeNetwork}
    />
  );
}
