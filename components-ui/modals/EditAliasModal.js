import {
  ButtonRow,
  Divider,
  Button,
  ModalOverlay,
  Modal,
  Input,
  Text,
} from "union-ui";
import { useModal } from "hooks/useModal";
import { useManageContactModal } from "components-ui/modals";

export const EDIT_ALIAS_MODAL = "edit-alias-modal";

export const useEditAliasModal = () => useModal(EDIT_ALIAS_MODAL);

export function EditAliasModal() {
  const { close } = useEditAliasModal();
  const { open: openManageContactModal } = useManageContactModal();

  const handleGoBack = () => {
    close();
    openManageContactModal();
  };

  return (
    <ModalOverlay>
      <Modal title="Edit contact name" onClose={close}>
        <Modal.Body>
          <Text size="large" mb="16px">
            Choose a name that helps you identify this contact within the Union
            app.
          </Text>
          <Input label="Contact name" placeholder="0x..." />
        </Modal.Body>
        <Modal.Footer>
          <ButtonRow mt="20px" fluid>
            <Button
              label="Go back"
              variant="secondary"
              fluid
              onClick={handleGoBack}
            />
            <Button label="Save" fluid />
          </ButtonRow>
        </Modal.Footer>
      </Modal>
    </ModalOverlay>
  );
}
