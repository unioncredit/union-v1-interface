import ApplicationCard from "@components/applicationCard";
import BorrowModal from "@components/borrowModal";
import Button from "@components/button";
import HealthBar from "@components/healthBar";
import LabelPair from "@components/labelPair";
import RepayModal from "@components/repayModal";
import Transaction from "@components/transaction";
import { TOKENS } from "@constants/";
import { useBorrowModalToggle, useRepayModalToggle } from "@contexts/Borrow";
import { borrow } from "@lib/contracts/borrow";
import { checkIsOverdue } from "@lib/contracts/checkIsOverdue";
import { getBorrowed } from "@lib/contracts/getBorrowed";
import { getCreditLimit } from "@lib/contracts/getCreditLimit";
import { getInterest } from "@lib/contracts/getInterest";
import { getLastRepay } from "@lib/contracts/getLastRepay";
import { getOverdueBlocks } from "@lib/contracts/getOverdueBlocks";
import { getTrustCount } from "@lib/contracts/getTrustCount";
import { repay } from "@lib/contracts/repay";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { placeholderTip } from "../text/tooltips";

export default function Borrow() {
  const { account, library, chainId } = useWeb3React();

  const toggleBorrowModal = useBorrowModalToggle();
  const toggleRepayModal = useRepayModalToggle();

  const [borrowed, setBorrowed] = useState("N/A");
  const [curToken, setCurToken] = useState();
  const [creditLimit, setCreditLimit] = useState("N/A");
  const [interest, setInterest] = useState("N/A");
  const [paymentDueDate, setPaymentDueDate] = useState(0);
  const [signer, setSigner] = useState([]);
  const [trustCount, setTrustCount] = useState(0);

  const data = {
    availableCredit: `${creditLimit} DAI`,
    percentUtilization:
      creditLimit > 0 ? ((borrowed / creditLimit) * 100).toFixed(0) : 0,
    balanceOwed: `${borrowed} DAI`,
    minPaymentDue: `${interest} DAI`,
    paymentDueDate: paymentDueDate,
    transactions: ["", ""],
  };

  useEffect(() => {
    if (library && account) {
      setCurToken(TOKENS[chainId]["DAI"]);
      getCreditData();
      getTrustCountData();
      getBorrowedData();
      getInterestData();
      getPaymentDueDate();
      setSigner(library.getSigner());
    }
  }, [library, account]);

  const getBorrowedData = async () => {
    const res = await getBorrowed(account, curToken, library, chainId);
    setBorrowed(res.toFixed(4));
  };

  const getTrustCountData = async () => {
    const res = await getTrustCount(account, curToken, library, chainId);
    setTrustCount(res);
  };

  const getCreditData = async () => {
    const res = await getCreditLimit(curToken, account, library, chainId);
    setCreditLimit(res.toFixed(4));
  };

  const getInterestData = async () => {
    const res = await getInterest(curToken, account, library, chainId);
    setInterest(res.toFixed(4));
  };

  const getPaymentDueDate = async () => {
    const isOverdue = await checkIsOverdue(curToken, account, library, chainId);
    if (isOverdue) {
      setPaymentDueDate("is overdue");
    } else {
      const lastRepay = await getLastRepay(curToken, account, library, chainId);

      const overdueBlocks = await getOverdueBlocks(curToken, library, chainId);
      const curBlock = await library.getBlockNumber();
      const days = ((lastRepay + overdueBlocks - curBlock) * 15) / 86400;
      setPaymentDueDate(`in ${days} Days`);
    }
  };

  const onBorrow = async (amount) => {
    await borrow(curToken, amount, signer, chainId);
  };

  const onRepay = async (amount) => {
    await repay(curToken, amount, signer, chainId);
  };

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

      <BorrowModal balanceOwed={data.balanceOwed} onRepay={onRepay} />
      <RepayModal balanceOwed={data.balanceOwed} onRepay={onRepay} />
    </div>
  );
}
