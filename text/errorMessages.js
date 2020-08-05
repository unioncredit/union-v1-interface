import { useBorrowModalToggle } from "components/BorrowModal/state";
import { useRepayModalToggle } from "components/RepayModal/state";
import { Fragment } from "react";

const OverdueBalanceMessage = () => {
  const toggleBorrowModal = useBorrowModalToggle();
  const toggleRepayModal = useRepayModalToggle();

  const makePayment = () => {
    toggleBorrowModal();
    toggleRepayModal();
  };

  return (
    <Fragment>
      You cannot borrow with an overdue balance.{" "}
      <button
        type="button"
        onClick={makePayment}
        className="font-medium underline focus:outline-none"
      >
        Make a payment
      </button>
    </Fragment>
  );
};

const errorMessages = {
  required: "Please fill out this field",
  notEnoughCredit: "Not enough available credit",
  overdueBalance: <OverdueBalanceMessage />,
  minDAIBorrow: "The minimum borrow is 1.00 DAI",
};

export default errorMessages;
