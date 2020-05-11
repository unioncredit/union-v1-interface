import Modal, { ModalHeader } from "./modal";
import { useTrustModalOpen, useTrustModalToggle } from "@contexts/Stake";
import Button from "./button";
import Input from "./input";
import { useForm } from "react-hook-form";

const TrustModal = ({ onTrust, initialAddress, initialTrust }) => {
  const open = useTrustModalOpen();
  const toggle = useTrustModalToggle();

  const { handleSubmit, register, formState, errors } = useForm();

  const { dirty, isSubmitting } = formState;

  const onSubmit = async (values) => {
    await onTrust(values.address, values.trust);

    toggle();
  };

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Vouch for a member" onDismiss={toggle} />

      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 py-6 sm:px-6 sm:py-8"
      >
        <Input
          autoFocus={!initialAddress}
          className="mb-4"
          defaultValue={initialAddress}
          pattern="^0x[a-fA-F0-9]{40}"
          id="address"
          label="Address"
          name="address"
          placeholder="Enter address"
          error={errors.address}
          ref={register({
            required: "Please fill out this field",
          })}
        />

        <Input
          autoFocus={!!initialAddress}
          chip="DAI"
          className="mb-4"
          defaultValue={initialTrust > 0 ? initialTrust : undefined}
          id="trust"
          label="Trust amount"
          name="trust"
          placeholder="0.00"
          tip="The amount you trust this address to borrow and be able to repay."
          type="number"
          error={errors.amount}
          ref={register({
            required: "Please fill out this field",
            min: {
              value: 0,
              message: "Value must be greater than 0",
            },
          })}
        />

        <div className="mt-20">
          <Button
            full
            type="submit"
            disabled={isSubmitting || !dirty}
            submitting={isSubmitting}
          >
            Confirm
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TrustModal;
