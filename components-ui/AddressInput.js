import { useWeb3React } from "@web3-react/core";
import EnsIcon from "union-ui/lib/icons/ens.svg";
import { Input, Box, Label, LoadingSpinner, Avatar } from "union-ui";
import errorMessages from "util/errorMessages";

import validateAddress from "util/validateAddress";
import { useRef, useState } from "react";
import { fetchENS } from "fetchers/fetchEns";

export const AddressInput = ({ onChange, error, ...props }) => {
  const { account } = useWeb3React();

  const timer = useRef(null);
  const [loading, setLoading] = useState(false);
  const [ensData, setEnsData] = useState(null);

  const isEns = false;

  const validateAddressInput = (address) => {
    if (address === account) return errorMessages.notVouchSelf;

    if (address.startsWith("0x")) {
      return validateAddress(address);
    }

    if (address.endsWith(".eth")) {
      return true;
    }

    return errorMessages.validAddress;
  };

  const handleChange = (event) => {
    setLoading(true);
    setEnsData(null);

    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      const input = event.target.value;
      const ensData = await fetchENS(input);
      if (ensData) {
        setEnsData({ ...ensData, inputIsENS: input.endsWith(".eth") });
        onChange && onChange(ensData.address);
        setLoading(false);
        return;
      }

      onChange && onChange(input);
      setLoading(false);
    }, 500);
  };

  return (
    <Input
      {...props}
      onChange={handleChange}
      error={!loading && error}
      suffix={isEns ? <EnsIcon /> : loading ? <LoadingSpinner /> : null}
      caption={
        ensData ? (
          <Box direction="horizontal" align="center">
            {!ensData.inputIsENS && <Avatar size={16} src={ensData.avatar} />}{" "}
            <Label mb={0} mt={0} ml="4px">
              {ensData.inputIsENS ? ensData.address : ensData.name}
            </Label>
          </Box>
        ) : (
          <div style={{ height: "20px" }} />
        )
      }
    />
  );
};
