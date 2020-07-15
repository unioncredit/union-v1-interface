import { useForm } from "react-hook-form";
import Button from "../button";
import Input from "../input";
import Modal, { ModalHeader } from "../modal";
import { useMarketModalOpen, useMarketModalToggle } from "./state";

const MarketModal = ({
  onSetOriginationFee,
  onSetDebtCeiling,
  onSetMaxBorrow,
  onSetMinLoan,
  onSetOverdueBlocks,
  onSetBorrowApr,
}) => {
  const open = useMarketModalOpen();
  const toggle = useMarketModalToggle();

  const { handleSubmit, register, watch, setValue } = useForm();

  const fee = watch("fee", 0);
  const debtCeiling = watch("debtCeiling", 0);
  const maxBorrow = watch("maxBorrow", 0);
  const minLoan = watch("minLoan", 0);
  const blocks = watch("blocks", 0);
  const apr = watch("apr", 0);

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Market" onDismiss={toggle} />
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <Input
          autoFocus
          chip="DAI"
          className="mb-8"
          id="fee"
          label="Origination Fee"
          placeholder="%"
          max={100}
          min={0}
          ref={register}
          required
          type="number"
        />
        <Button full onClick={() => onSetOriginationFee(fee)}>
          Confirm
        </Button>
        <div className="divider mb-8" />
        <Input
          autoFocus
          chip="DAI"
          className="mb-8"
          id="debtCeiling"
          label="Debt Ceiling"
          placeholder="DAI"
          min={0}
          ref={register}
          required
          type="number"
        />
        <Button full onClick={() => onSetDebtCeiling(debtCeiling)}>
          Confirm
        </Button>
        <div className="divider mb-8" />
        <Input
          autoFocus
          chip="DAI"
          className="mb-8"
          id="maxBorrow"
          label="Max Borrow"
          placeholder="DAI"
          min={0}
          ref={register}
          required
          type="number"
        />
        <Button full onClick={() => onSetMaxBorrow(maxBorrow)}>
          Confirm
        </Button>
        <div className="divider mb-8" />
        <Input
          autoFocus
          chip="DAI"
          className="mb-8"
          id="minLoan"
          label="Min Loan"
          placeholder="DAI"
          min={0}
          ref={register}
          required
          type="number"
        />
        <Button full onClick={() => onSetMinLoan(minLoan)}>
          Confirm
        </Button>
        <div className="divider mb-8" />
        <Input
          autoFocus
          chip=""
          className="mb-8"
          id="blocks"
          label="Overdue Blocks"
          placeholder=""
          min={0}
          ref={register}
          required
          type="number"
        />
        <Button full onClick={() => onSetOverdueBlocks(blocks)}>
          Confirm
        </Button>
        <div className="divider mb-8" />
        <Input
          autoFocus
          chip=""
          className="mb-8"
          id="apr"
          label="Borrow Apr"
          placeholder="%"
          min={0}
          ref={register}
          required
          type="number"
        />
        <Button full onClick={() => onSetBorrowApr(apr)}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default MarketModal;
