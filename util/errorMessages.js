import { commify } from "@ethersproject/units";
import { useBorrowModalToggle } from "components/modals/BorrowModal/state";
import { useRepayModalToggle } from "components/modals/RepayModal/state";
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
  notEnoughStake: "Insufficient withdrawable stake",
  notEnoughBalanceDAI: "Not enough DAI in your wallet",
  notEnoughPoolDAI: "Insufficient DAI available",
  overdueBalance: <OverdueBalanceMessage />,
  maxBorrow: (max) =>
    `The maximum borrow is ${commify(Number(max).toFixed(2))} DAI`,
  minDAIBorrow: "The minimum borrow is 1.00 DAI",
  minVouch: "The minimum vouch is 1.00 DAI",
  minValuePointZeroOne: "Value must be greater than 0.01",
  minValueOnePointZero: "Value must be greater than or equal to 1.00",
  minValueZero: "Value must be greater than 0.00",
  validEmail: "Please enter a valid email",
  knownScam: "This address is associated with a known scam",
  validAddress: "Please input a valid Ethereum address",
  cantRemoveStake: "You can't remove used stake",
};

export default errorMessages;
