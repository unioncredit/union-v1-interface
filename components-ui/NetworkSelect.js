import { Select } from "union-ui";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { switchChain, options } from "util/switchChain";

export function NetworkSelect() {
  const [loading, setIsLoading] = useState(false);
  const { chainId } = useWeb3React();

  const defaultValueIndex = options.findIndex(
    (option) => option.chainId === chainId
  );

  const handleChangeNetwork = async (value) => {
    setIsLoading(true);
    await switchChain(value);
    setIsLoading(false);
  };

  return (
    <Select
      options={options}
      mb="20px"
      onChange={handleChangeNetwork}
      isLoading={loading}
      defaultValue={!!~defaultValueIndex && options[defaultValueIndex]}
    />
  );
}
