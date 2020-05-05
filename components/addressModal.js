import { useAddressModalOpen, useAddressModalToggle } from "@contexts/Stake";
import delay from "@lib/delay";
import { useAutoCallback } from "hooks.macro";
import { useState } from "react";
import Button from "./button";
import Identicon from "./identicon";
import Modal, { ModalHeader } from "./modal";

const AddressModal = ({ address, vouched, used, health }) => {
  const isOpen = useAddressModalOpen();
  const toggle = useAddressModalToggle();

  const [removingAddress, removingAddressSet] = useState(false);

  const removeAddress = useAutoCallback(async () => {
    try {
      removingAddressSet(true);

      /**
       * Simulate tx to remove address
       */
      await delay();

      removingAddressSet(false);
    } catch (err) {
      console.error(err);
      removingAddressSet(false);
    }
  });

  return (
    <Modal isOpen={isOpen} onDismiss={toggle}>
      <ModalHeader title="&nbsp;" onDismiss={toggle} />

      <div className="px-4 pb-6 pt-4">
        <div className="flex justify-center">
          <Identicon address={address} extraLarge />
        </div>

        <div className="mt-24">
          <Button full>Adjust Vouch</Button>
        </div>
        <div className="mt-4">
          <Button
            full
            invert
            onClick={removeAddress}
            disabled={removingAddress}
            submitting={removingAddress}
          >
            Remove Address
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddressModal;
