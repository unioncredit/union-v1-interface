import {
  ButtonRow,
  Divider,
  Button,
  ModalOverlay,
  Modal,
  Input,
  Heading,
  Text,
  Box,
  Badge,
} from "union-ui";
import { useModal } from "hooks/useModal";
import { useManageContactModal } from "components-ui/modals";
import { AddressLabel } from "components-ui";
import format from "util/formatValue";
import errorMessages from "util/errorMessages";
import { useForm } from "react-hook-form";

export const EDIT_VOUCH_MODAL = "edit-vouch-modal";

export const useEditVouchModal = () => useModal(EDIT_VOUCH_MODAL);

export function EditVouchModal({ address, used, vouched }) {
  const { close } = useEditVouchModal();
  const { open: openManageContactModal } = useManageContactModal();

  const { register, formState, errors, watch } = useForm();
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

  return (
    <ModalOverlay>
      <Modal title="Change credit limit" onClose={close}>
        <Box mb="24px" justify="space-between">
          <AddressLabel address={address} />
          <Badge label="Trusted contact" color="green" />
        </Box>
        <Box>
          <Box direction="vertical">
            <Text>Credit limit</Text>
            <Heading>DAI {format(vouched)}</Heading>
          </Box>
          <Box direction="vertical" ml="32px">
            <Text>Unpaid Debt</Text>
            <Heading>DAI {format(used)}</Heading>
          </Box>
        </Box>
        <Divider />
        <Heading mt="28px" mb="4px">
          Set contacts trust
        </Heading>
        <Text mb="16px" size="large">
          What’s the total value of credit you’d like to make available for this
          contact?
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
        <Heading>DAI {amount}</Heading>
        <Divider />
        <ButtonRow mt="20px">
          <Button
            label="Go back"
            variant="secondary"
            fluid
            onClick={handleGoBack}
          />
          <Button label="Save" fluid disabled={!isDirty || isSubmitting} />
        </ButtonRow>
      </Modal>
    </ModalOverlay>
  );
}
