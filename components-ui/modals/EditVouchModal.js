import {
  ButtonRow,
  Divider,
  Button,
  ModalOverlay,
  Input,
  Heading,
  Text,
  Box,
  Badge,
} from "union-ui";
import { useModal } from "hooks/useModal";
import { useManageContactModal } from "components-ui/modals";
import { AddressLabel, Dai, Modal } from "components-ui";
import format from "util/formatValue";
import errorMessages from "util/errorMessages";
import { useForm } from "react-hook-form";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import useAdjustTrust from "hooks/payables/useAdjustTrust";
import useTrustData from "hooks/data/useTrustData";
import { useWeb3React } from "@web3-react/core";
import useCreditLimit from "hooks/data/useCreditLimit";
import { addActivity } from "hooks/data/useActivity";
import activityLabels from "util/activityLabels";

export const EDIT_VOUCH_MODAL = "edit-vouch-modal";

export const useEditVouchModal = () => useModal(EDIT_VOUCH_MODAL);

export function EditVouchModal({ address, used, vouched }) {
  const { library } = useWeb3React();
  const { close } = useEditVouchModal();
  const adjustTrust = useAdjustTrust();
  const { mutate: updateTrustData } = useTrustData();
  const { mutate: updateCreditLimit } = useCreditLimit();
  const { open: openManageContactModal } = useManageContactModal();

  const { register, formState, errors, watch, handleSubmit } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { isDirty, isSubmitting } = formState;

  const amount = watch("amount", 0);

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
      addActivity(
        activityLabels.adjustVouch({ address, amount: values.amount }, true)
      );
      handleTxError(err);
    }
  };

  return (
    <ModalOverlay>
      <Modal title="Change credit limit" onClose={close} drawer>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleAdjustTrust)}>
            <Box mb="24px" justify="space-between">
              <AddressLabel address={address} />
              <Badge label="Trusted contact" color="green" />
            </Box>
            <Box>
              <Box direction="vertical">
                <Text>Credit limit</Text>
                <Heading>
                  <Dai value={format(vouched)} />
                </Heading>
              </Box>
              <Box direction="vertical" ml="32px">
                <Text>Unpaid Debt</Text>
                <Heading>
                  <Dai value={format(used)} />
                </Heading>
              </Box>
            </Box>
            <Divider />
            <Heading mt="28px" mb="4px">
              Set contacts trust
            </Heading>
            <Text mb="16px" size="large">
              What’s the total value of credit you’d like to make available for
              this contact?
            </Text>
            <Input
              ref={register({ validate })}
              name="amount"
              label="Credit limit"
              suffix="DAI"
              error={errors.amount?.message}
            />
            <Text mt="16px" mb="4px">
              New credit limit
            </Text>
            <Heading>
              <Dai value={amount} />
            </Heading>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <ButtonRow mt="20px" fluid>
            <Button
              fluid
              label="Go back"
              variant="secondary"
              onClick={handleGoBack}
            />
            <Button
              label="Save"
              fluid
              disabled={!isDirty}
              loading={isSubmitting}
              onClick={handleSubmit(handleAdjustTrust)}
            />
          </ButtonRow>
        </Modal.Footer>
      </Modal>
    </ModalOverlay>
  );
}
