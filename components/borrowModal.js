import { Contract } from "@ethersproject/contracts";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import LENDING_MARKET_ABI from "constants/abis/lendingMarket.json";
import MARKET_REGISTRY_ABI from "constants/abis/marketRegistry.json";
import { MARKET_REGISTRY_ADDRESSES } from "constants/variables";
import { useBorrowModalOpen, useBorrowModalToggle } from "contexts/Borrow";
import { useAutoCallback } from "hooks.macro";
import useContract from "hooks/useContract";
import useCurrentToken from "hooks/useCurrentToken";
import useToast from "hooks/useToast";
import { borrow } from "lib/contracts/borrow";
import { useForm } from "react-hook-form";
import Info from "svgs/Info";
import handleTxError from "util/handleTxError";
import Button from "./button";
import Input from "./input";
import LabelPair from "./labelPair";
import Modal, { ModalHeader } from "./modal";

function useBorrow() {
  const { library, chainId } = useWeb3React();
  const curToken = useCurrentToken();

  const marketRegistryContract = useContract(
    MARKET_REGISTRY_ADDRESSES[chainId],
    MARKET_REGISTRY_ABI
  );

  const addToast = useToast();

  return useAutoCallback(async (amount) => {
    const marketAddress = await marketRegistryContract.tokens(curToken);

    const lendingMarketContract = new Contract(
      marketAddress,
      LENDING_MARKET_ABI,
      library.getSigner()
    );

    const amountToBorrow = parseUnits(amount, 18).toString();

    const tx = await lendingMarketContract.borrow(amountToBorrow);

    await tx.wait();
  });
}

const BorrowModal = ({
  balanceOwed,
  creditLimit,
  fee,
  onComplete,
  paymentDueDate,
}) => {
  const { library, chainId } = useWeb3React();
  const curToken = useCurrentToken();

  const open = useBorrowModalOpen();
  const toggle = useBorrowModalToggle();

  const {
    errors,
    formState,
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm();

  const { dirty, isSubmitting } = formState;

  const addToast = useToast();

  const onSubmit = async (values) => {
    const { amount } = values;

    try {
      await borrow(curToken, amount, library.getSigner(), chainId);

      toggle();

      onComplete();
    } catch (err) {
      const message = handleTxError(err);

      addToast(message, { type: "error", hideAfter: 20 });

      toggle();
    }
  };

  const amount = watch("amount", 0);

  const calculateFee = Number(parseFloat(amount || 0) * parseFloat(fee));

  const formatNewBalance = Number(
    parseFloat(balanceOwed) + parseFloat(amount || 0) + parseFloat(calculateFee)
  ).toFixed(2);

  const formatNewCredit = Number(
    parseFloat(creditLimit) > 0
      ? parseFloat(creditLimit) - parseFloat(amount || 0)
      : 0
  ).toFixed(2);

  const maxBorrowable = Number(
    parseFloat(creditLimit) > 0 ? parseFloat(creditLimit) : 0
  ).toFixed(2);

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Borrow" onDismiss={toggle} />
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6"
      >
        <dl className="flex justify-between py-2 items-center mb-2 leading-tight">
          <dt>Balance owed</dt>
          <dd className="text-right">{`${balanceOwed} DAI`}</dd>
        </dl>

        <div className="divider" />

        <p className="mt-6 mb-4">How much would you like to borrow?</p>

        <Input
          autoFocus
          chip="DAI"
          id="amount"
          name="amount"
          step="0.01"
          type="number"
          label="Amount"
          placeholder="0.00"
          setMaxValue={maxBorrowable}
          setMax={() => setValue("amount", maxBorrowable)}
          error={errors.amount}
          ref={register({
            required: "Please fill out this field",
            max: {
              value: maxBorrowable,
              message: `Value must be less than or equal to ${maxBorrowable}`,
            },
            min: {
              value: 1,
              message: "Value must be greater than 1.00",
            },
          })}
        />

        <LabelPair
          className="mt-4"
          label="New balance owed"
          value={formatNewBalance}
          valueType="DAI"
        />

        <div className="flex justify-end mb-4">
          <span
            className="inline-flex items-center text-xs cursor-help"
            title={""}
          >
            <div className="mr-2">
              <Info />
            </div>
            <span className="underline">
              Includes fee of {calculateFee.toFixed(2)} DAI
            </span>
          </span>
        </div>

        <div className="divider" />

        <dl className="flex justify-between py-2 items-center my-2 leading-tight">
          <dt className="text-type-light">New available credit</dt>
          <dd className="text-right">{`${formatNewCredit} DAI`}</dd>
        </dl>

        <div className="divider" />

        <dl className="flex justify-between py-2 items-center my-2 leading-tight">
          <dt className="text-type-light">Next payment due</dt>
          <dd className="text-right">{paymentDueDate ?? `in 30 days`}</dd>
        </dl>

        <div className="divider" />

        <div className="mt-6">
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

export default BorrowModal;
