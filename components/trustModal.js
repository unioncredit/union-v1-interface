import Modal, { ModalHeader } from "./modal";
import { useTrustModalOpen, useTrustModalToggle } from "@contexts/Stake";
import Button from "./button";
import Input from "./input";
import { useForm } from "react-hook-form";

const TrustModal = ({ onTrust, initialAddress, initialTrust }) => {
  const open = useTrustModalOpen();
  const toggle = useTrustModalToggle();

  const { handleSubmit, register } = useForm();

  const onSubmit = (values) => onTrust(values.address, values.trust);

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Vouch for a member" onDismiss={toggle} />

      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 py-6 sm:px-6 sm:py-8"
      >
        <Input
          autoFocus
          className="mb-4"
          defaultValue={initialAddress}
          pattern="^0x[a-fA-F0-9]{40}"
          id="address"
          label="Address"
          name="address"
          placeholder="Enter address"
          ref={register}
          required
        />

        <Input
          chip="DAI"
          className="mb-4"
          defaultValue={initialTrust > 0 ? initialTrust : undefined}
          id="trust"
          label="Trust amount"
          name="trust"
          placeholder="0.00"
          ref={register}
          required
          tip="The amount you trust this address to borrow and be able to repay."
          type="number"
          min={0}
        />

        <div className="mt-20">
          <Button full type="submit">
            Confirm
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TrustModal;
