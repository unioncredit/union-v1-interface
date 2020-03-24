import Modal, { ModalHeader } from "./modal";
import { useTrustModalOpen, useTrustModalToggle } from "@contexts/Stake";
import Button from "./button";
import Input from "./input";
import { useForm } from "react-hook-form";

const TrustModal = () => {
  const open = useTrustModalOpen();
  const toggle = useTrustModalToggle();

  const { handleSubmit, register } = useForm();

  const onSubmit = (values) => {
    setTimeout(() => console.log(values), 1000);
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
          autoFocus
          className="mb-4"
          id="address"
          label="Address or ENS Name"
          placeholder="Enter address or ENS"
          ref={register}
          required
        />

        <Input
          chip="DAI"
          className="mb-4"
          id="trust"
          label="Trust amount"
          placeholder="0.00"
          ref={register}
          required
          tip="The amount you trust this address to borrow and be able to repay."
          type="number"
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
