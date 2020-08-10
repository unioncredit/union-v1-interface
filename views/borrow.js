import ApplicationCard from "components/applicationCard";
import BorrowModal from "components/BorrowModal";
import { useBorrowModalToggle } from "components/BorrowModal/state";
import Button from "components/button";
import LabelPair from "components/labelPair";
import RepayModal from "components/RepayModal";
import { useRepayModalToggle } from "components/RepayModal/state";
import SuccessModal from "components/SuccessModal";
import Transaction, { TransactionSkeleton } from "components/transaction";
import { UtilizationBarWithPercentage } from "components/utilizationBar";
import useBorrowData from "hooks/contracts/useBorrowData";
import useCreditLimit from "hooks/useCreditLimit";
import useIsMember from "hooks/useIsMember";
import useTransactions from "hooks/useTransactions";
import Link from "next/link";
import { Fragment } from "react";
import { roundDown, roundUp, toPercent } from "util/numbers";

export default function BorrowView() {
  const toggleBorrowModal = useBorrowModalToggle();
  const toggleRepayModal = useRepayModalToggle();

  const { data: isMember } = useIsMember();

  const {
    data: transactionsData,
    mutate: updateTransactionsData,
  } = useTransactions();

  const { data: creditLimit = 0, mutate: updateCreditLimit } = useCreditLimit();

  const { data: borrowData, mutate: updateBorrowData } = useBorrowData();

  const {
    borrowedRounded = 0,
    interest = 0,
    paymentDueDate = "-",
    paymentPeriod = "-",
    fee = 0,
    apr = 0,
    isOverdue = false,
  } = !!borrowData && borrowData;

  const formatApr = toPercent(apr, 2);

  const onComplete = async () => {
    await updateBorrowData();
    await updateCreditLimit();
    await updateTransactionsData();
  };

  return (
    <Fragment>
      <div className="container">
        {isMember === false && <ApplicationCard />}

        <div className="mb-4">
          <h1 className="h-12 leading-12">Dashboard</h1>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6 mb-10">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <div className="bg-black-pure border border-black-pure rounded p-6 text-white">
              <div className="flex justify-between items-start mb-10">
                <LabelPair
                  label="Available Credit"
                  large
                  outline={true}
                  value={roundDown(creditLimit)}
                  valueType="DAI"
                />

                <Button
                  disabled={isMember === true ? false : true}
                  onClick={toggleBorrowModal}
                  tertiary
                  wide
                >
                  Borrow
                </Button>
              </div>

              <LabelPair
                label="Percent Utilization"
                value={
                  <UtilizationBarWithPercentage
                    borrowed={borrowedRounded}
                    creditLimit={creditLimit}
                  />
                }
                responsive
              />

              <div className="md:flex justify-between py-2">
                <p className="text-sm mb-4 md:mb-0">
                  Current Rate: {formatApr} APR
                </p>

                <Link href="/vouch">
                  <a className="underline text-sm">Increase my limit</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-white border rounded p-6">
              <div className="flex justify-between items-start mb-10">
                <LabelPair
                  label="Balance Owed"
                  value={borrowedRounded}
                  valueType="DAI"
                  large
                />

                <Button
                  disabled={isMember === true ? false : true}
                  onClick={toggleRepayModal}
                  wide
                >
                  Repay
                </Button>
              </div>

              <LabelPair
                className="text-type-light"
                label="Minimum Payment Due"
                valueType="DAI"
                value={roundUp(interest)}
              />

              <LabelPair
                className="text-type-light"
                label="Payment Due Date"
                value={paymentDueDate}
              />
            </div>
          </div>
        </div>

        {isMember === true && (
          <Fragment>
            <div className="mb-4">
              <h2 className="h-12 leading-12">Transactions</h2>
            </div>

            {transactionsData && transactionsData.length ? (
              transactionsData.map((datum, i) => (
                <Transaction key={i} {...datum} />
              ))
            ) : (
              <Fragment>
                <TransactionSkeleton />
                <TransactionSkeleton />
                <TransactionSkeleton />
              </Fragment>
            )}
          </Fragment>
        )}
      </div>

      <BorrowModal
        balanceOwed={borrowedRounded}
        creditLimit={creditLimit}
        fee={fee}
        onComplete={onComplete}
        paymentDueDate={paymentDueDate}
        paymentPeriod={paymentPeriod}
        isOverdue={isOverdue}
      />

      <RepayModal balanceOwed={borrowedRounded} onComplete={onComplete} />

      <SuccessModal />
    </Fragment>
  );
}
