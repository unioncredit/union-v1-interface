import { ButtonRow, Button, ModalOverlay, Input, Text } from "union-ui";
import { useModal } from "hooks/useModal";
import { useManageContactModal } from "components-ui/modals";
import { Modal } from "components-ui";
import useAddressLabels from "hooks/useAddressLabels";
import useToast, { FLAVORS } from "hooks/useToast";
import errorMessages from "util/errorMessages";
import { useForm } from "react-hook-form";

export const EDIT_ALIAS_MODAL = "edit-alias-modal";

export const useEditAliasModal = () => useModal(EDIT_ALIAS_MODAL);

export function EditAliasModal({ address }) {
  const { close } = useEditAliasModal();
  const { open: openManageContactModal } = useManageContactModal();
  const { setLabel } = useAddressLabels();
  const { formState, register, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { isDirty, isSubmitting } = formState;

  const addToast = useToast();

  const handleGoBack = () => {
    close();
    openManageContactModal();
  };

  const handleUpdateAlias = async (values) => {
    await setLabel(address, values.label);
    handleGoBack();
    addToast(FLAVORS.SUCCESS("Label updated"));
  };

  return (
    <ModalOverlay>
      <Modal title="Edit contact name" onClose={close} drawer>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleUpdateAlias)}>
            <Text size="large" mb="16px">
              Choose a name that helps you identify this contact within the
              Union app.
            </Text>
            <Input
              error={errors?.label?.message}
              name="label"
              label="Contact name"
              placeholder="0x..."
              ref={register({
                required: errorMessages.required,
              })}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <ButtonRow mt="20px" fluid>
            <Button
              label="Go back"
              variant="secondary"
              fluid
              onClick={handleGoBack}
              disabled={isSubmitting}
            />
            <Button
              label="Save"
              fluid
              disabled={!isDirty}
              loading={isSubmitting}
              onClick={handleSubmit(handleUpdateAlias)}
            />
          </ButtonRow>
        </Modal.Footer>
      </Modal>
    </ModalOverlay>
  );
}
