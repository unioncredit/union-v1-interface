import { useVouchModal, VouchModal } from "components-ui/modals";

export function VouchModalManager() {
  const { isOpen: isVouchModalOpen } = useVouchModal();

  if (isVouchModalOpen) {
    return <VouchModal />;
  }

  return null;
}
