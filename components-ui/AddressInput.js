import EnsIcon from "union-ui/lib/icons/ens.svg";
import { Input, Box, Label, LoadingSpinner, Avatar } from "union-ui";

import { useRef, useState } from "react";
import { fetchENS } from "fetchers/fetchEns";

import styles from "./AddressInput.module.css";

export const AddressInput = ({ onChange, error, ...props }) => {
  const timer = useRef(null);
  const [loading, setLoading] = useState(false);
  const [ensData, setEnsData] = useState(null);

  const handleChange = (event) => {
    setLoading(true);
    setEnsData(null);

    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      const input = event.target.value;
      const ensData = await fetchENS(input);
      const inputIsENS = input.endsWith(".eth");

      setEnsData({ ...ensData, inputIsENS });

      const formValue = inputIsENS ? ensData.address : input;
      onChange && onChange(formValue);
      setLoading(false);
    }, 500);
  };

  const inputError =
    (!loading && error) ||
    (ensData?.inputIsENS &&
      !ensData.address &&
      "ENS doesn’t resolve to an address");

  return (
    <div className={styles.addressInput}>
      <Input
        {...props}
        onChange={handleChange}
        error={inputError}
        suffix={
          loading ? (
            <div className={styles.loadingSpinner}>
              <LoadingSpinner />
            </div>
          ) : ensData?.inputIsENS ? (
            <EnsIcon
              className={inputError ? styles.ensIconError : styles.ensIconValid}
            />
          ) : null
        }
        caption={
          ensData ? (
            <Box direction="horizontal" align="center" mt="4px">
              {ensData.avatar && <Avatar size={16} src={ensData.avatar} />}{" "}
              <Label mb={0} mt={0} ml="4px" size="small">
                {ensData.inputIsENS
                  ? ensData.address
                  : ensData.name
                  ? ensData.name
                  : "No ENS Registered"}
              </Label>
            </Box>
          ) : (
            <div style={{ height: "22px" }} />
          )
        }
      />
    </div>
  );
};
