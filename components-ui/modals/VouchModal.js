import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { ModalOverlay, Box, Input, Button } from "union-ui";
import { useModal } from "hooks/useModal";
import { Modal } from "components-ui";
import validateAddress from "util/validateAddress";
import { useWeb3React } from "@web3-react/core";
import errorMessages from "util/errorMessages";
import { useRouter } from "next/router";
import { Dai } from "components-ui/Dai";
import { useAddActivity } from "hooks/data/useActivity";
import useTrustData from "hooks/data/useTrustData";
import useAdjustTrust from "hooks/payables/useAdjustTrust";
import getReceipt from "util/getReceipt";
import isHash from "util/isHash";
import handleTxError from "util/handleTxError";
import activityLabels from "util/activityLabels";

export const VOUCH_MODAL = "vouch-modal";

export const useVouchModal = () => useModal(VOUCH_MODAL);

export function VouchModal() {
  const { query } = useRouter();
  const { account, library } = useWeb3React();
  const { close } = useVouchModal();
  const addActivity = useAddActivity();
  const { mutate: updateTrustData } = useTrustData();

  const adjustTrust = useAdjustTrust();

  const { formState, handleSubmit, register, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { isDirty, isSubmitting } = formState;

  const handleNewVouch = async (data) => {
    try {
      const { hash } = await adjustTrust(data.address, data.amount);
      await getReceipt(hash, library);
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
      handleTxError(err);
    }
  };

  const validateAddressInput = (address) => {
    if (address === account) return errorMessages.notVouchSelf;
    return validateAddress(address);
  };

  return (
    <ModalOverlay>
      <Modal title="Vouch for someone" onClose={close}>
        <form onSubmit={handleSubmit(handleNewVouch)}>
          <Input
            ref={register({ validate: validateAddressInput })}
            name="address"
            value={query?.address}
            label="Address"
            placeholder="e.g. 0xA1e3..."
            error={errors.address?.message}
          />
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
              label="Vouch amount"
              placeholder="0.0"
              error={errors?.amount?.message}
            />
          </Box>
          <Button
            fluid
            mt="32px"
            type="submit"
            loading={isSubmitting}
            disabled={!isDirty}
            label="Confirm vouch"
          />
        </form>
      </Modal>
    </ModalOverlay>
  );
}

VouchModal.propTypes = {
  onNext: PropTypes.func.isRequired,
};
