import ApplicationCard from "@components/applicationCard";
import BorrowModal from "@components/borrowModal";
import Button from "@components/button";
import HealthBar from "@components/healthBar";
import LabelPair from "@components/labelPair";
import RepayModal from "@components/repayModal";
import Transaction from "@components/transaction";
import { useBorrowModalToggle, useRepayModalToggle } from "@contexts/Borrow";
import useCurrentToken from "@hooks/useCurrentToken";
import { borrow } from "@lib/contracts/borrow";
import { checkIsOverdue } from "@lib/contracts/checkIsOverdue";
import { getBorrowed } from "@lib/contracts/getBorrowed";
import { getCreditLimit } from "@lib/contracts/getCreditLimit";
import { getInterest } from "@lib/contracts/getInterest";
import { getLastRepay } from "@lib/contracts/getLastRepay";
import { getOriginationFee } from "@lib/contracts/getOriginationFee";
import { getOverdueBlocks } from "@lib/contracts/getOverdueBlocks";
import { repay } from "@lib/contracts/repay";
import { blockSpeed } from "@constants";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { placeholderTip } from "../text/tooltips";

const getPercentUtilized = (borrowed, creditLimit) =>
  creditLimit > 0 ? borrowed / creditLimit : 0;

export default function Borrow() {
  const { account, library, chainId } = useWeb3React();

  const curToken = useCurrentToken();

  const toggleBorrowModal = useBorrowModalToggle();
  const toggleRepayModal = useRepayModalToggle();

  const [borrowed, setBorrowed] = useState(0);
  const [creditLimit, setCreditLimit] = useState(0);
  const [interest, setInterest] = useState(0);
  const [paymentDueDate, setPaymentDueDate] = useState("N/A");
  const [fee, setFee] = useState(0);
  const [signer, setSigner] = useState([]);

  const transactions = [];

  useEffect(() => {
    if (library && account) {
      getCreditData();
      getBorrowedData();
      getInterestData();
      getPaymentDueDate();
      getOriginationFeeData();
      setSigner(library.getSigner());
    }
  }, [library, account]);

  const getBorrowedData = async () => {
    try {
      const res = await getBorrowed(account, curToken, library, chainId);

      setBorrowed(res.toFixed(4));
    } catch (err) {
      console.error(err);
    }
  };

  const getCreditData = async () => {
    try {
      const res = await getCreditLimit(curToken, account, library, chainId);

      setCreditLimit(res.toFixed(4));
    } catch (err) {
      console.error(err);
    }
  };

  const getOriginationFeeData = async () => {
    try {
      const res = await getOriginationFee(curToken, library, chainId);

      setFee(res.toFixed(4));
    } catch (err) {
      console.error(err);
    }
  };

  const getInterestData = async () => {
    try {
      const res = await getInterest(curToken, account, library, chainId);

      setInterest(res.toFixed(4));
    } catch (err) {
      console.error(err);
    }
  };

  const getPaymentDueDate = async () => {
    try {
      const isOverdue = await checkIsOverdue(
        curToken,
        account,
        library,
        chainId
      );

      if (isOverdue) {
        setPaymentDueDate("Overdue");
        return;
      }

      const lastRepay = await getLastRepay(curToken, account, library, chainId);

      const overdueBlocks = await getOverdueBlocks(curToken, library, chainId);

      const curBlock = await library.getBlockNumber();

      if (lastRepay == 0) {
        setPaymentDueDate(`-`);
        return;
      }

      const days = (
        ((lastRepay + overdueBlocks - curBlock) * blockSpeed[chainId]) /
        86400
      ).toFixed(2);

      setPaymentDueDate(`in ${days} days`);
    } catch (err) {
      console.error(err);
    }
  };

  const onBorrow = async (amount) => {
    try {
      await borrow(curToken, amount, signer, chainId);
    } catch (err) {
      console.error(err);
    }
  };

  const onRepay = async (amount) => {
    try {
      await repay(curToken, amount, signer, chainId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-10">
      <Head>
        <title>Borrow | Union</title>
      </Head>

      <div className="container">
        <ApplicationCard />

        <div className="mb-5">
          <h1>Dashboard</h1>
        </div>

        <div className="flex flex-col md:flex-row -mx-3 mb-10">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <div className="bg-black-pure border border-black-pure rounded p-6 text-white">
              <div className="flex justify-between items-start mb-10">
                <LabelPair
                  label="Available Credit"
                  value={creditLimit}
                  valueType="DAI"
                  large
                  outline={true}
                />

                <Button tertiary onClick={toggleBorrowModal}>
                  Borrow
                </Button>
              </div>

              <dl className="flex flex-col md:flex-row justify-between md:items-center py-2">
                <dt className="leading-tight whitespace-no-wrap cursor-help mb-4 md:mb-0">
                  <div className="flex items-center" title={placeholderTip}>
                    <div className="mr-2">Percent Utilization</div>
                    <span
                      className="text-sm leading-none"
                      role="img"
                      aria-label="Information"
                    >
                      ℹ️
                    </span>
                  </div>
                </dt>
                <dd className="leading-tight whitespace-no-wrap font-semibold text-lg text-right">
                  <div className="flex items-center">
                    <p className="mr-4 text-white">
                      {getPercentUtilized(borrowed, creditLimit).toLocaleString(
                        undefined,
                        {
                          style: "percent",
                          maximumFractionDigits: 0,
                        }
                      )}
                    </p>
                    <HealthBar
                      health={getPercentUtilized(borrowed, creditLimit)}
                      dark
                    />
                  </div>
                </dd>
              </dl>

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
          <div className="w-full md:w-1/2 px-3">
            <div className="bg-white border rounded p-6">
              <div className="flex justify-between items-start mb-10">
                <LabelPair
                  label="Balance Owed"
                  value={borrowed}
                  valueType="DAI"
                  large
                />

                <Button onClick={toggleRepayModal}>Repay</Button>
              </div>

              <LabelPair
                className="text-type-light"
                tooltip={placeholderTip}
                label="Minimum Payment Due"
                valueType="DAI"
                value={interest}
              />

              <LabelPair
                className="text-type-light"
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

        {transactions.length > 0 &&
          transactions.map((datum, i) => <Transaction key={i} />)}
      </div>

      <BorrowModal
        balanceOwed={borrowed}
        creditLimit={creditLimit}
        paymentDueDate={paymentDueDate}
        fee={fee}
        onBorrow={onBorrow}
      />
      <RepayModal balanceOwed={borrowed} onRepay={onRepay} />
    </div>
  );
}
