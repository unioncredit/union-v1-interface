import ApplicationCard from "@components/applicationCard";
import BorrowModal from "@components/borrowModal";
import Button from "@components/button";
import HealthBar from "@components/healthBar";
import LabelPair from "@components/labelPair";
import { TOKENS } from "@constants/";
import RepayModal from "@components/repayModal";
import Transaction from "@components/transaction";
import { useBorrowModalToggle, useRepayModalToggle } from "@contexts/Borrow";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { placeholderTip } from "../text/tooltips";

import { borrow } from "@lib/contracts/borrow";
import { repay } from "@lib/contracts/repay";
import { getBorrowed } from "@lib/contracts/getBorrowed";
import { getCreditLimit } from "@lib/contracts/getCreditLimit";
import { getLastRepay } from "@lib/contracts/getLastRepay";
import { getInterest } from "@lib/contracts/getInterest";
import { getTrustCount } from "@lib/contracts/getTrustCount";

export default function Borrow() {
  const { account, library, chainId } = useWeb3React();

  const toggleBorrowModal = useBorrowModalToggle();
  const toggleRepayModal = useRepayModalToggle();

  const [borrowed, setBorrowed] = useState('N/A');
  const [creditLimit, setCreditLimit] = useState('N/A');
  const [interest, setInterest] = useState('N/A');
  const [trustCount, setTrustCount] = useState(0);
  const [paymentDueDate, setPaymentDueDate] = useState(0);

  const data = {
    availableCredit: "0 DAI",
    percentUtilization: 0,
    balanceOwed: "0 DAI",
    minPaymentDue: "0 DAI",
    paymentDueDate: "in 10 Days",
    transactions: ["", ""],
  };

  useEffect(() => {
    if (library) {
      getCreditData();
      getTrustCountData();
      getBorrowedData();
      getInterestData();
      getPaymentDueDate();
    }
  }, []);

  const getBorrowedData = async () => {
    const res = await getBorrowed(account, TOKENS[chainId]["DAI"], library, chainId);
    setBorrowed(res.toString());
  }

  const getTrustCountData = async () => {
    const res = await getTrustCount(account, TOKENS[chainId]["DAI"], library, chainId);
    setTrustCount(res);
  }

  const getCreditData = async () => {
    const res = await getCreditLimit(TOKENS[chainId]["DAI"], account, library, chainId);
    setCreditLimit(res.toString());
  }

  const getInterestData = async () => {
    const res = await getInterest(TOKENS[chainId]["DAI"], account, library, chainId);
    setInterest(res.toString());
  }

  const getPaymentDueDate = async () => {
    const res = await getLastRepay(TOKENS[chainId]["DAI"], account, library, chainId);
    setPaymentDueDate(res.toString());
  }

  const onBorrow = async (amount) => {
    await borrow(TOKENS[chainId]["DAI"], amount, library, chainId);
  }

  const onRepay = async (amount) => {
    await repay(TOKENS[chainId]["DAI"], amount, library, chainId);
  }

  return (
    <div>
      <Head>
        <title>Borrow | Union</title>
      </Head>

      <div className="container">
        <ApplicationCard count={trustCount} />

        <div className="mb-5">
          <h1>Dashboard</h1>
        </div>

        <div className="flex -mx-3 mb-10">
          <div className="w-1/2 px-3">
            <div className="bg-black-pure border border-black-pure rounded p-6 text-white">
              <div className="flex justify-between items-start mb-10">
                <LabelPair
                  label="Available Credit"
                  value={creditLimit}
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
                      {creditLimit > 0 ? ((borrowed / creditLimit) * 100).toFixed(0) : 0}%
                    </p>
                    <HealthBar health={creditLimit > 0 ? ((borrowed / creditLimit) * 100).toFixed(0) : 0} dark />
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
                  value={borrowed}
                  large
                />

                <Button wide onClick={toggleRepayModal}>
                  Repay
                </Button>
              </div>

              <LabelPair
                tooltip={placeholderTip}
                label="Minimum Payment Due"
                value={interest}
              />

              <LabelPair
                label="Payment Due Date"
                tooltip={placeholderTip}
                value={paymentDueDate}
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

      <BorrowModal balanceOwed={borrowed} onRepay={onRepay} />
      <RepayModal balanceOwed={borrowed} onRepay={onRepay} />
    </div>
  );
}
