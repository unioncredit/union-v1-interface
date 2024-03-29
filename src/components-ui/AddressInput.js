import { ReactComponent as EnsIcon } from "@unioncredit/ui/lib/icons/ens.svg";
import makeBlockie from "ethereum-blockies-base64";
import { Input, Box, Label, LoadingSpinner } from "@unioncredit/ui";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchENS } from "fetchers/fetchEns";

import styles from "./AddressInput.module.css";
import errorMessages from "util/errorMessages";
import validateAddress from "util/validateAddress";
import { Avatar } from "components-ui/Avatar";

export const generateHandleChange = ({
  clearErrors,
  setValue,
  setError,
  validate,
}) => {
  const validateAddressInput = (address) => {
    if (!address) return errorMessages.required;
    if (validate) {
      const res = validate(address);
      if (res !== true) return res;
    }
    if (address.startsWith("0x")) return validateAddress(address);
    if (address.endsWith(".eth")) return true;
    return errorMessages.validAddressOrEns;
  };

  return (value) => {
    clearErrors("address");
    const setAddress = (address) => {
      setValue("address", address, { shouldDirty: true, shouldValidate: true });
    };

    const addressError = validateAddressInput(value);
    if (addressError !== true) {
      setError("address", { message: addressError });
      return;
    }

    setAddress(value);
  };
};

export const AddressInput = ({ onChange, error, defaultValue, ...props }) => {
  const timer = useRef(null);
  const [loading, setLoading] = useState(false);
  const [ensData, setEnsData] = useState(null);

  const refresh = useCallback(async (value) => {
    const ensData = await fetchENS(value);
    const inputIsENS = value.endsWith(".eth");
    setEnsData({ ...ensData, inputIsENS });
    return inputIsENS ? ensData.address : value;
  }, []);

  useEffect(() => {
    if (!defaultValue) return;
    (async () => {
      setLoading(true);
      await refresh(defaultValue);
      setLoading(false);
    })();
  }, [defaultValue, refresh]);

  const handleChange = (event) => {
    setEnsData(null);
    setLoading(true);

    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      const value = await refresh(event.target.value);
      onChange && onChange(value);
      setLoading(false);
    }, 1000);
  };

  const inputError =
    (ensData?.inputIsENS &&
      !ensData.address &&
      "ENS doesn’t resolve to an address") ||
    (!loading && error);

  return (
    <div className={styles.addressInput}>
      <Input
        {...props}
        onChange={handleChange}
        defaultValue={defaultValue}
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
              {(ensData.avatar || ensData.address) && (
                <Avatar size={16} address={ensData.address} />
              )}{" "}
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
