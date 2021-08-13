import { useState } from "react";

import {
  useVouchModal,
  VouchModal,
  NewVouchModal,
  useNewVouchModal,
} from "components-ui/modals";

export function VouchModalManager() {
  const [address, setAddress] = useState(null);
  const { isOpen: isVouchModalOpen } = useVouchModal();
  const { isOpen: isNewVouchModalOpen } = useNewVouchModal();

  if (isVouchModalOpen) {
    return <VouchModal onNext={setAddress} />;
  } else if (isNewVouchModalOpen) {
    return <NewVouchModal address={address || "0x000000000000000000"} />;
  }

  return null;
}
