import BorrowModal from "@components/borrowModal";
import Button from "@components/button";
import Container from "@components/container";
import HealthBar from "@components/healthBar";
import LabelPair from "@components/labelPair";
import RepayModal from "@components/repayModal";
import { useBorrowModalToggle, useRepayModalToggle } from "@contexts/Borrow";
import Head from "next/head";
import Link from "next/link";

export default function Borrow() {
  const toggleBorrowModal = useBorrowModalToggle();
  const toggleRepayModal = useRepayModalToggle();

  return (
    <div>
      <Head>
        <title>Borrow | Union</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="mb-5">
          <h1>Dashboard</h1>
        </div>

        <div className="flex -mx-3 mb-5">
          <div className="w-1/2 px-3">
            <div className="bg-secondary-500 border border-secondary-500 rounded p-6 text-white">
              <div className="flex justify-between items-start mb-10">
                <LabelPair label="Available Credit" value="1520 DAI" large />

                <Button wide tertiary onClick={toggleBorrowModal}>
                  Borrow
                </Button>
              </div>

              <LabelPair
                label="Percent Utilization"
                value={
                  <div className="flex items-center">
                    <HealthBar health={66.99} />
                    <p className="ml-4">66.99%</p>
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
                <LabelPair label="Balance Owed" value="693.34 DAI" large />

                <Button wide onClick={toggleRepayModal}>
                  Repay
                </Button>
              </div>

              <LabelPair label="Minimum Payment Due" value="64.28 DAI" />

              <LabelPair label="Payment Due Date" value="in 10 Days" />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <h2>Transactions</h2>
        </div>

        <div className="mb-4 bg-white border rounded p-6 flex items-center">
          <div className="h-12 w-12 rounded-full bg-accent" />

          <div className="flex-1 mx-4">
            <p className="mb-2 leading-none">
              <strong className="font-semibold">alex56.eth increased</strong>{" "}
              your credit limit
            </p>
            <p className="font-normal leading-none">4 Feb 2020</p>
          </div>

          <div>
            <p>650 DAI</p>
          </div>
        </div>

        <div className="mb-4 bg-white border rounded p-6 flex items-center">
          <div className="h-12 w-12 rounded-full bg-accent" />

          <div className="flex-1 mx-4">
            <p className="mb-2 leading-none">
              <strong className="font-semibold">alex56.eth increased</strong>{" "}
              your credit limit
            </p>
            <p className="font-normal leading-none">4 Feb 2020</p>
          </div>

          <div>
            <p>650 DAI</p>
          </div>
        </div>
      </Container>

      <BorrowModal />
      <RepayModal />
    </div>
  );
}
