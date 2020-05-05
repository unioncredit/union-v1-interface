import { useAddressModalOpen, useAddressModalToggle } from "@contexts/Stake";
import useENSName from "@hooks/useENSName";
import delay from "@lib/delay";
import truncateAddress from "@util/truncateAddress";
import { useAutoCallback } from "hooks.macro";
import { useState } from "react";
import Button from "./button";
import HealthBar from "./healthBar";
import Identicon from "./identicon";
import Modal, { CloseButton } from "./modal";

const AddressModal = ({ address, vouched, used, health }) => {
  const isOpen = useAddressModalOpen();
  const toggle = useAddressModalToggle();

  const ENSName = useENSName(address);

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
      <div className="px-4 sm:px-6 pb-6 pt-4 relative">
        <div className="absolute right-0 top-0 mr-6 mt-6">
          <CloseButton onClick={toggle} />
        </div>

        <div className="flex justify-center mt-10">
          <Identicon address={address} extraLarge />
        </div>

        <div className="mt-4">
          <p className="text-center text-lg font-semibold" title={address}>
            {ENSName ?? truncateAddress(address)}
          </p>
        </div>

        <div className="mt-16">
          <dl className="flex justify-between py-2 items-center mb-2 leading-tight">
            <dt className="text-type-light">Vouched</dt>
            <dd className="text-right">{`${vouched} DAI`}</dd>
          </dl>
          <dl className="flex justify-between py-2 items-center mb-2 leading-tight">
            <dt className="text-type-light">Used stake</dt>
            <dd className="text-right">{`${used} DAI`}</dd>
          </dl>
          <dl className="flex justify-between py-2 items-center mb-2 leading-tight">
            <dt className="text-type-light">Health</dt>
            <dd className="text-right">
              <HealthBar health={health} />
            </dd>
          </dl>
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
