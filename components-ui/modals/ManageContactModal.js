import {
  Divider,
  Button,
  ModalOverlay,
  Modal,
  Card,
  Text,
  Label,
  Badge,
  Box,
} from "union-ui";
import { useModal } from "hooks/useModal";
import useAddressLabels from "hooks/useAddressLabels";
import { useEditAliasModal, useEditVouchModal } from "components-ui/modals";
import { AddressLabel } from "components-ui";

export const MANAGE_CONTACT_MODAL = "manage-contact-modal";

export const useManageContactModal = () => useModal(MANAGE_CONTACT_MODAL);

export function ManageContactModal({ address, vouched }) {
  const { close } = useManageContactModal();
  const { open: openEditAliasModal } = useEditAliasModal();
  const { open: openEditVouchModal } = useEditVouchModal();
  const { getLabel } = useAddressLabels();

  const handleEditName = () => {
    close();
    openEditAliasModal();
  };

  const handleEditVouch = () => {
    close();
    openEditVouchModal();
  };

  const data = [
    {
      label: "Contact name",
      value: getLabel(address) || "-",
      buttonLabel: "Edit",
      onClick: handleEditName,
    },
    {
      label: "Credit limit",
      value: `${vouched} DAI`,
      buttonLabel: "Change limit",
      onClick: handleEditVouch,
    },
  ];

  return (
    <ModalOverlay>
      <Modal title="Manage contact" onClose={close} drawer>
        <Modal.Body>
          <Box mb="24px" justify="space-between">
            <AddressLabel address={address} />
            <Badge label="Trusted contact" color="green" />
          </Box>
          {data.map(({ label, value, buttonLabel, onClick }) => (
            <Card variant="packed" mb="8px">
              <Card.Body>
                <Label>{label}</Label>
                <Box align="center">
                  <Text size="large" mb={0}>
                    {value}
                  </Text>
                  <Button
                    ml="auto"
                    variant="secondary"
                    rounded
                    label={buttonLabel}
                    onClick={onClick}
                  />
                </Box>
              </Card.Body>
            </Card>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            fluid
            mt="16px"
            color="red"
            variant="secondary"
            label="Remove from contacts"
          />
          <Label as="p" size="small" align="center" mt="24px">
            Contacts with outstanding balance can’t be removed
          </Label>
        </Modal.Footer>
      </Modal>
    </ModalOverlay>
  );
}
