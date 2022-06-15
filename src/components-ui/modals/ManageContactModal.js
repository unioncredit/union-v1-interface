import { useEditVouchModal, useWriteOffDebtModal } from "components-ui/modals";
import { Button, ModalOverlay, Text, Label, Box } from "@unioncredit/ui";
import { useModal, useModalOpen } from "hooks/useModal";
import { MiniProfileCard, Modal, Dai, EditLabel } from "components-ui";
import { useState } from "react";
import { useAddActivity } from "hooks/data/useActivity";
import activityLabels from "util/activityLabels";
import handleTxError from "util/handleTxError";
import getReceipt from "util/getReceipt";
import { useWeb3React } from "@web3-react/core";
import useTrustData from "hooks/data/useTrustData";
import useRemoveVouch from "hooks/payables/useRemoveVouch";
import format from "util/formatValue";
import isHash from "util/isHash";
import { ContactsType } from "constants/app";
import { formatUnits } from "@ethersproject/units";

export const MANAGE_CONTACT_MODAL = "manage-contact-modal";

export const useManageContactModal = () => useModal(MANAGE_CONTACT_MODAL);

export const useManageContactModalOpen = () =>
  useModalOpen(MANAGE_CONTACT_MODAL);

export function ManageContactModal({
  address,
  used,
  trust,
  isLabelOnly,
  isOverdue,
  contactType,
}) {
  const addActivity = useAddActivity();
  const removeVouch = useRemoveVouch();

  const { library } = useWeb3React();
  const [removing, setRemoving] = useState(false);
  const { mutate: updateTrustData } = useTrustData();

  const { close } = useManageContactModal();
  const { open: openEditVouchModal } = useEditVouchModal();
  const { open: openWriteOffDebtModalOpen } = useWriteOffDebtModal();

  const isOpen = useManageContactModalOpen();

  if (!isOpen) return null;

  const handleEditVouch = () => {
    close();
    openEditVouchModal();
  };

  const handleWriteOffDebt = () => {
    close();
    openWriteOffDebtModalOpen();
  };

  const data = [
    {
      label: "Trust",
      value: <Dai value={format(formatUnits(trust), 2)} />,
      buttonProps: { label: "Change amount" },
      onClick: handleEditVouch,
    },
    {
      label: "Outstanding debt",
      value: <Dai value={format(formatUnits(used), 2)} />,
      buttonProps: {
        label: "Write-off debt",
        disabled: used <= 0 || !isOverdue,
      },
      onClick: handleWriteOffDebt,
    },
  ];

  const handleRemoveContact = async () => {
    try {
      setRemoving(true);
      const { hash } = await removeVouch(address);
      await getReceipt(hash, library);
      addActivity(activityLabels.removeContact({ address, hash }));
      await updateTrustData();
      close();
    } catch (err) {
      const hash = isHash(err.message) && err.message;
      addActivity(activityLabels.removeContact({ address, hash }, true));
      handleTxError(err);
    } finally {
      setRemoving(false);
    }
  };

  return (
    <ModalOverlay onClick={close}>
      <Modal title="Manage contact" onClose={close} size="medium">
        <MiniProfileCard address={address} />
        <EditLabel address={address} />
        {!isLabelOnly &&
          data.map(({ label, value, onClick, buttonProps }) => (
            <Box
              key={label}
              fluid
              justify="space-between"
              align="center"
              mb="12px"
            >
              <Box direction="vertical">
                <Label size="small" grey={400} as="p" m={0}>
                  {label.toUpperCase()}
                </Label>
                <Text size="large" mb={0}>
                  {value}
                </Text>
              </Box>
              <Box>
                <Button
                  ml="auto"
                  variant="pill"
                  {...buttonProps}
                  onClick={onClick}
                />
              </Box>
            </Box>
          ))}
        {contactType === ContactsType.YOU_TRUST && used <= 0 && (
          <>
            <Label as="p" align="center" mt="24px" grey={400}>
              Contacts with outstanding balance can’t be removed
            </Label>
            <Button
              fluid
              mt="16px"
              color="red"
              fontSize="large"
              variant="secondary"
              label="Remove from contacts"
              loading={removing}
              onClick={handleRemoveContact}
            />
          </>
        )}
      </Modal>
    </ModalOverlay>
  );
}
