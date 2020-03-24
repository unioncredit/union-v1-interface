import { useDepositModalOpen, useDepositModalToggle } from "@contexts/Stake";
import { useForm } from "react-hook-form";
import Button from "./button";
import Input from "./input";
import Modal, { ModalHeader } from "./modal";

const DepositModal = ({ totalStake }) => {
  const open = useDepositModalOpen();
  const toggle = useDepositModalToggle();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = (values) => {
    setTimeout(() => console.log(values), 1000);
  };

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Deposit" onDismiss={toggle} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 py-6 sm:px-6 sm:py-8"
      >
        <div className="mb-6">Current total stake: {totalStake}</div>

        <Input
          className="mb-8"
          id="depositAmount"
          label="Deposit Amount"
          placeholder="0.00"
          ref={register}
          type="number"
          required
          chip="DAI"
          tip="Increases your UPY by 0 UNION"
        />

        <div className="w-full h-px bg-border-pure" />

        <div className="mb-8 mt-6">New total stake</div>

        <Button full type="submit" disabled={isSubmitting}>
          Confirm
        </Button>
      </form>
    </Modal>
  );
};

export default DepositModal;
