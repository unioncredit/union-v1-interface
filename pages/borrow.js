import ApplicationCard from "@components/applicationCard";
import BorrowModal from "@components/borrowModal";
import Button from "@components/button";
import Container from "@components/container";
import HealthBar from "@components/healthBar";
import LabelPair from "@components/labelPair";
import RepayModal from "@components/repayModal";
import { useBorrowModalToggle, useRepayModalToggle } from "@contexts/Borrow";
import Head from "next/head";
import Link from "next/link";
import Transaction from "@components/transaction";

export default function Borrow() {
  const toggleBorrowModal = useBorrowModalToggle();
  const toggleRepayModal = useRepayModalToggle();

  const data = {
    availableCredit: "1520 DAI",
    percentUtilization: 70,
    balanceOwed: "693.34 DAI",
    minPaymentDue: "64.28 DAI",
    paymentDueDate: "in 10 Days",
    transactions: ["", ""]
  };

  return (
    <div>
      <Head>
        <title>Borrow | Union</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <ApplicationCard />

        <div className="mb-5">
          <h1>Dashboard</h1>
        </div>

        <div className="flex -mx-3 mb-10">
          <div className="w-1/2 px-3">
            <div className="bg-secondary-500 border border-secondary-500 rounded p-6 text-white">
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
                value={
                  <div className="flex items-center">
                    <HealthBar health={data.percentUtilization} />
                    <p className="ml-4">{data.percentUtilization}%</p>
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
                label="Minimum Payment Due"
                value={data.minPaymentDue}
              />

              <LabelPair label="Payment Due Date" value={data.paymentDueDate} />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <h2>Transactions</h2>
        </div>

        {data.transactions.length > 0 &&
          data.transactions.map((datum, i) => <Transaction key={i} />)}
      </Container>

      <BorrowModal />
      <RepayModal />
    </div>
  );
}
