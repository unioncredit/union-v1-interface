import { Grid, Button, ModalOverlay, Input, Stat } from "union-ui";
import { useModal } from "hooks/useModal";
import { useManageContactModal } from "components-ui/modals";
import { Dai, Modal } from "components-ui";
import format from "util/formatValue";
import errorMessages from "util/errorMessages";
import { useForm } from "react-hook-form";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import useAdjustTrust from "hooks/payables/useAdjustTrust";
import useTrustData from "hooks/data/useTrustData";
import { useWeb3React } from "@web3-react/core";
import useCreditLimit from "hooks/data/useCreditLimit";
import { useAddActivity } from "hooks/data/useActivity";
import activityLabels from "util/activityLabels";
import isHash from "util/isHash";

export const EDIT_VOUCH_MODAL = "edit-vouch-modal";

export const useEditVouchModal = () => useModal(EDIT_VOUCH_MODAL);

export function EditVouchModal({ address, used, vouched }) {
  const addActivity = useAddActivity();
  const { library } = useWeb3React();
  const { close } = useEditVouchModal();
  const adjustTrust = useAdjustTrust();
  const { mutate: updateTrustData } = useTrustData();
  const { mutate: updateCreditLimit } = useCreditLimit();
  const { open: openManageContactModal } = useManageContactModal();

  const { register, formState, errors, handleSubmit } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { isDirty, isSubmitting } = formState;

  const validate = (val) => {
    if (Number(val) <= used) return errorMessages.cantRemoveStake;
    if (Number(val) <= 0) return errorMessages.minValueZero;
    if (!val) return errorMessages.required;

    return true;
  };

  const handleGoBack = () => {
    close();
    openManageContactModal();
  };

  const handleAdjustTrust = async (values) => {
    try {
      const { hash } = await adjustTrust(address, values.amount);
      await getReceipt(hash, library);
      addActivity(
        activityLabels.adjustVouch({ address, amount: values.amount, hash })
      );
      await updateTrustData();
      await updateCreditLimit();
      handleGoBack();
    } catch (err) {
      const hash = isHash(err.message) && err.message;
      addActivity(
        activityLabels.adjustVouch(
          { address, amount: values.amount, hash },
          true
        )
      );
      handleTxError(err);
    }
  };

  return (
    <ModalOverlay>
      <Modal title="Change credit limit" onClose={close}>
        <form onSubmit={handleSubmit(handleAdjustTrust)}>
          <Grid>
            <Grid.Row>
              <Grid.Col>
                <Stat
                  mb="24px"
                  size="medium"
                  align="center"
                  label="Credit limit"
                  value={<Dai value={format(vouched)} />}
                />
              </Grid.Col>
              <Grid.Col>
                <Stat
                  mb="24px"
                  size="medium"
                  align="center"
                  label="Unpaid debt"
                  value={<Dai value={format(used)} />}
                />
              </Grid.Col>
            </Grid.Row>
          </Grid>
          <Input
            type="number"
            ref={register({ validate })}
            name="amount"
            label="Credit limit"
            suffix={<Dai />}
            error={errors.amount?.message}
          />
          <Button
            mt="18px"
            fluid
            label="Save"
            fontSize="large"
            type="submit"
            disabled={!isDirty}
            loading={isSubmitting}
          />
        </form>
      </Modal>
    </ModalOverlay>
  );
}
