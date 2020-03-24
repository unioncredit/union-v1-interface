import ApplicationCard from "@components/applicationCard";
import BorrowModal from "@components/borrowModal";
import Button from "@components/button";
import HealthBar from "@components/healthBar";
import LabelPair from "@components/labelPair";
import RepayModal from "@components/repayModal";
import Transaction from "@components/transaction";
import { useBorrowModalToggle, useRepayModalToggle } from "@contexts/Borrow";
import Head from "next/head";
import Link from "next/link";
import { placeholderTip } from "../text/tooltips";

export default function Borrow() {
  const toggleBorrowModal = useBorrowModalToggle();
  const toggleRepayModal = useRepayModalToggle();

  const data = {
    availableCredit: "0 DAI",
    percentUtilization: 0,
    balanceOwed: "0 DAI",
    minPaymentDue: "0 DAI",
    paymentDueDate: "in 10 Days",
    transactions: ["", ""],
  };

  return (
    <div>
      <Head>
        <title>Borrow | Union</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <ApplicationCard />

        <div className="mb-5">
          <h1>Dashboard</h1>
        </div>

        <div className="flex -mx-3 mb-10">
          <div className="w-1/2 px-3">
            <div className="bg-black-pure border border-black-pure rounded p-6 text-white">
              <div className="flex justify-between items-start mb-10">
                <LabelPair
                  label="Available Credit"
                  value={data.availableCredit}
                  large
                />

                <Button wide tertiary onClick={toggleBorrowModal}>
                  Borrow
                </Button>
              </div>

              <LabelPair
                label="Percent Utilization"
                tooltip={placeholderTip}
                value={
                  <div className="flex items-center">
                    <p className="mr-4 text-white">
                      {data.percentUtilization}%
                    </p>
                    <HealthBar health={data.percentUtilization} dark />
                  </div>
                }
              />

              <div className="flex justify-between py-2">
                <Link href="/vouch">
                  <a className="underline text-sm">See my breakdown</a>
                </Link>
                <Link href="/stake">
                  <a className="underline text-sm">Increase my limit</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-1/2 px-3">
            <div className="bg-white border rounded p-6">
              <div className="flex justify-between items-start mb-10">
                <LabelPair
                  label="Balance Owed"
                  value={data.balanceOwed}
                  large
                />

                <Button wide onClick={toggleRepayModal}>
                  Repay
                </Button>
              </div>

              <LabelPair
                tooltip={placeholderTip}
                label="Minimum Payment Due"
                value={data.minPaymentDue}
              />

              <LabelPair
                label="Payment Due Date"
                tooltip={placeholderTip}
                value={data.paymentDueDate}
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <h2>Transactions</h2>
        </div>

        {data.transactions.length > 0 &&
          data.transactions.map((datum, i) => <Transaction key={i} />)}
      </div>

      <BorrowModal />
      <RepayModal balanceOwed={data.balanceOwed} />
    </div>
  );
}
