import { useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import { isAddress } from "@ethersproject/address";
import Info from "union-ui/lib/icons/wireInfo.svg";
import { ModalOverlay, Box, Input, Button, Alert } from "union-ui";

import { useModal } from "hooks/useModal";
import useTrustData from "hooks/data/useTrustData";
import useAddressLabels from "hooks/useAddressLabels";
import { useAddActivity } from "hooks/data/useActivity";
import useAdjustTrust from "hooks/payables/useAdjustTrust";
import isHash from "util/isHash";
import getReceipt from "util/getReceipt";
import errorMessages from "util/errorMessages";
import handleTxError from "util/handleTxError";
import activityLabels from "util/activityLabels";
import truncateAddress from "util/truncateAddress";
import validateAddress from "util/validateAddress";
import { Dai, MiniProfileCard, Modal, AddressInput } from "components-ui";

export const VOUCH_MODAL = "vouch-modal";

export const useVouchModal = () => useModal(VOUCH_MODAL);

export function VouchModal() {
  const { query } = useRouter();
  const { library, account } = useWeb3React();
  const { close } = useVouchModal();
  const addActivity = useAddActivity();
  const { data: trustData, mutate: updateTrustData } = useTrustData();
  const { setLabel } = useAddressLabels();

  const adjustTrust = useAdjustTrust();

  const {
    formState,
    handleSubmit,
    register,
    errors,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { isDirty, isSubmitting } = formState;

  useEffect(() => {
    register("address");
  }, []);

  const watchAddress = watch("address");
  const address = isAddress(watchAddress) && watchAddress;

  const handleNewVouch = async (data) => {
    try {
      const { hash } = await adjustTrust(data.address, data.amount);
      setLabel(data.address, data.alias);
      await getReceipt(hash, library, {
        pending: `Vouching ${data.amount} DAI for ${truncateAddress(
          data.address
        )}`,
        success: `Vouched ${data.amount} DAI for ${truncateAddress(
          data.address
        )}`,
      });
      addActivity(
        activityLabels.newVouch({
          address: data.address,
          amount: data.amount,
          hash,
        })
      );
      await updateTrustData();
      close();
    } catch (err) {
      const hash = isHash(err.message) && err.message;
      addActivity(
        activityLabels.newVouch(
          { address: data.address, amount: data.amount, hash },
          true
        )
      );
      handleTxError(err, `Failed to vouch ${data.amount} DAI`);
    }
  };

  const validateAddressInput = (address) => {
    if (!address) return errorMessages.required;
    if (address === account) return errorMessages.notVouchSelf;
    if (address.startsWith("0x")) return validateAddress(address);
    if (address.endsWith(".eth")) return true;
    return errorMessages.validAddress;
  };

  const handleAddressInputChange = (value) => {
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

  const maxTrust = 25;

  const maxTrustData = trustData?.length >= maxTrust;

  return (
    <ModalOverlay onClick={close}>
      <Modal title="New vouch" onClose={close}>
        <MiniProfileCard address={!errors.address?.message && address} />
        <form onSubmit={handleSubmit(handleNewVouch)}>
          <AddressInput
            name="address"
            label="Address"
            disabled={maxTrustData}
            placeholder="e.g. 0xA1e3..."
            defaultValue={query?.address}
            error={errors.address?.message}
            onChange={handleAddressInputChange}
          />
          <Box mt="8px">
            <Input
              ref={register}
              name="alias"
              label="Alias"
              disabled={maxTrustData}
              placeholder="e.g. Halkyone Olga"
            />
          </Box>
          <Box mt="16px">
            <Input
              ref={register({
                required: errorMessages.required,
                min: {
                  value: 1.0,
                  message: errorMessages.minValueOnePointZero,
                },
              })}
              suffix={<Dai />}
              name="amount"
              type="number"
              label="Trust amount"
              placeholder="0.0"
              disabled={maxTrustData}
              error={errors?.amount?.message}
            />
          </Box>
          <Box mt="32px" direction="vertical">
            {maxTrustData && (
              <Alert
                packed
                size="small"
                label={`You have reached the max trust limit of ${trustData?.length} vouches`}
                icon={<Info />}
              />
            )}
            <Button
              fluid
              mt="8px"
              type="submit"
              loading={isSubmitting}
              disabled={!isDirty || maxTrustData}
              label="Confirm vouch"
            />
          </Box>
        </form>
      </Modal>
    </ModalOverlay>
  );
}

VouchModal.propTypes = {
  onNext: PropTypes.func.isRequired,
};
