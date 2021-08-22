import { Button, ModalOverlay, Card, Text, Label, Badge, Box } from "union-ui";
import { useModal } from "hooks/useModal";
import useAddressLabels from "hooks/useAddressLabels";
import { useEditAliasModal, useEditVouchModal } from "components-ui/modals";
import { AddressLabel, Modal, Dai } from "components-ui";
import useIsMember from "hooks/data/useIsMember";

export const MANAGE_CONTACT_MODAL = "manage-contact-modal";

export const useManageContactModal = () => useModal(MANAGE_CONTACT_MODAL);

export function ManageContactModal({ address, vouched, isLabelOnly }) {
  const { close } = useManageContactModal();
  const { open: openEditAliasModal } = useEditAliasModal();
  const { open: openEditVouchModal } = useEditVouchModal();
  const { getLabel } = useAddressLabels();
  const isMember = useIsMember();

  const handleEditName = () => {
    close();
    openEditAliasModal();
  };

  const handleEditVouch = () => {
    close();
    openEditVouchModal();
  };

  const defaultData = [
    {
      label: "Contact name",
      value: getLabel(address) || "-",
      buttonLabel: "Edit",
      onClick: handleEditName,
    },
  ];

  const data = isLabelOnly
    ? defaultData
    : [
        ...defaultData,
        {
          label: "Credit limit",
          value: <Dai value={vouched} />,
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
            <Badge
              label={isMember ? "Union member" : "Not a member"}
              color={isMember ? "green" : "orange"}
            />
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
