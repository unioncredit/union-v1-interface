import ApplicationCard from "components/applicationCard";
import BorrowModal from "components/BorrowModal";
import { useBorrowModalToggle } from "components/BorrowModal/state";
import Button from "components/button";
import LabelPair from "components/labelPair";
import RepayModal from "components/RepayModal";
import { useRepayModalToggle } from "components/RepayModal/state";
import Transaction from "components/transaction";
import UtilizationBar from "components/utilizationBar";
import useBorrowData from "hooks/useBorrowData";
import useCreditLimit from "hooks/useCreditLimit";
import useIsMember from "hooks/useIsMember";
import useTransactions from "hooks/useTransactions";
import Link from "next/link";
import { Fragment } from "react";
import Info from "svgs/Info";
import { roundDown, roundUp, toPercent } from "util/numbers";
import { minimumPaymentDueTip, percentUtilizedTip } from "../text/tooltips";

const getPctUsed = (borrowed, creditLimit) => {
  if (creditLimit === 0 && borrowed === 0) return 0;

  return borrowed / (creditLimit + borrowed);
};

export default function BorrowView() {
  const toggleBorrowModal = useBorrowModalToggle();
  const toggleRepayModal = useRepayModalToggle();

  const { data: isMember = false } = useIsMember();

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
    fee = 0,
    apr = 0,
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

        <div className="mb-5">
          <h1>Dashboard</h1>
        </div>

        <div className="flex flex-col md:flex-row -mx-3 mb-10">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <div className="bg-black-pure border border-black-pure rounded p-6 text-white">
              <div className="flex justify-between items-start mb-10">
                <LabelPair
                  label="Available Credit"
                  value={roundDown(creditLimit)}
                  valueType="DAI"
                  large
                  outline={true}
                />

                <Button
                  tertiary
                  disabled={isMember === true ? false : true}
                  onClick={toggleBorrowModal}
                >
                  Borrow
                </Button>
              </div>

              <dl className="flex flex-col md:flex-row justify-between md:items-center py-2">
                <dt className="leading-tight whitespace-no-wrap cursor-help mb-4 md:mb-0">
                  <div className="flex items-center" title={percentUtilizedTip}>
                    <div className="mr-2">Percent Utilization</div>
                    <Info light />
                  </div>
                </dt>
                <dd className="leading-tight whitespace-no-wrap font-semibold text-lg text-right">
                  <div className="flex items-center">
                    <p className="mr-4 text-white">
                      {toPercent(
                        getPctUsed(borrowedRounded, roundDown(creditLimit))
                      )}
                    </p>
                    <UtilizationBar
                      usage={Number(
                        getPctUsed(borrowedRounded, roundDown(creditLimit)) *
                          100
                      )}
                    />
                  </div>
                </dd>
              </dl>

              <div className="flex justify-between py-2">
                <p className="text-sm">Current Rate: {formatApr} APR</p>

                <Link href="/vouch">
                  <a className="underline text-sm">Increase my limit</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3">
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
                >
                  Repay
                </Button>
              </div>

              <LabelPair
                className="text-type-light"
                tooltip={minimumPaymentDueTip}
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
          <div>
            <div className="mb-5">
              <h2>Transactions</h2>
            </div>
            {transactionsData &&
              transactionsData.length > 0 &&
              transactionsData.map((datum, i) => (
                <Transaction key={i} {...datum} />
              ))}
          </div>
        )}
      </div>

      <BorrowModal
        balanceOwed={borrowedRounded}
        creditLimit={creditLimit}
        fee={fee}
        onComplete={onComplete}
        paymentDueDate={paymentDueDate}
      />

      <RepayModal balanceOwed={borrowedRounded} onComplete={onComplete} />
    </Fragment>
  );
}
