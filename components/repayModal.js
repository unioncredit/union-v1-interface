import { useRepayModalOpen, useRepayModalToggle } from "@contexts/Borrow";
import Modal, { ModalHeader } from "./modal";
import { useForm } from "react-hook-form";
import LabelPair from "./labelPair";
import Input from "./input";
import Button from "./button";

const RepayModal = ({ balanceOwed }) => {
  const isOpen = useRepayModalOpen();
  const toggle = useRepayModalToggle();

  const { handleSubmit, register } = useForm();

  const onSubmit = (values) => {
    setTimeout(() => console.log(values), 1000);
  };

  return (
    <Modal isOpen={isOpen} onDismiss={toggle}>
      <ModalHeader title="Repay" onDismiss={toggle} />
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 py-6 sm:px-6 sm:py-8"
      >
        <LabelPair className="mb-10" label="Balance owed" value={balanceOwed} />

        <p className="mb-4">How much would you like to repay?</p>

        <Input
          autoFocus
          chip="DAI"
          className="mb-10"
          id="repayAmount"
          label="Amount"
          placeholder="0.00"
          ref={register}
          required
          type="number"
        />

        <LabelPair className="mb-8" label="New balance owed" value={"-"} />

        <LabelPair
          className="mb-8 text-grey-pure"
          label="New min payment"
          value={balanceOwed}
        />

        <Button type="submit" full>
          Confirm
        </Button>
      </form>
    </Modal>
  );
};

export default RepayModal;
