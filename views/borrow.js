import ApplicationCard from "@components/applicationCard";
import BorrowModal from "@components/borrowModal";
import Button from "@components/button";
import HealthBar from "@components/healthBar";
import LabelPair from "@components/labelPair";
import RepayModal from "@components/repayModal";
import Transaction from "@components/transaction";
import { blockSpeed } from "@constants";
import { useBorrowModalToggle, useRepayModalToggle } from "@contexts/Borrow";
import useCurrentToken from "@hooks/useCurrentToken";
import useIsMember from "@hooks/useIsMember";
import { borrow } from "@lib/contracts/borrow";
import { checkIsOverdue } from "@lib/contracts/checkIsOverdue";
import { getBorrowed } from "@lib/contracts/getBorrowed";
import { getBorrowTransactions } from "@lib/contracts/getBorrowTransactions";
import { getCreditLimit } from "@lib/contracts/getCreditLimit";
import { getInterest } from "@lib/contracts/getInterest";
import { getLastRepay } from "@lib/contracts/getLastRepay";
import { getOriginationFee } from "@lib/contracts/getOriginationFee";
import { getOverdueBlocks } from "@lib/contracts/getOverdueBlocks";
import { getRepayTransactions } from "@lib/contracts/getRepayTransactions";
import { repay } from "@lib/contracts/repay";
import { useWeb3React } from "@web3-react/core";
import { useAutoCallback, useAutoEffect } from "hooks.macro";
import Link from "next/link";
import { Fragment, useState } from "react";
import Info from "svgs/Info";
import { minimumPaymentDueTip, utilizedStakeTip } from "../text/tooltips";

const getPercentUtilized = (borrowed, creditLimit) =>
  creditLimit > 0 ? borrowed / creditLimit : 0;

export default function BorrowView() {
  const { account, library, chainId } = useWeb3React();

  const curToken = useCurrentToken();

  const toggleBorrowModal = useBorrowModalToggle();
  const toggleRepayModal = useRepayModalToggle();

  const isMember = useIsMember();

  const [borrowed, setBorrowed] = useState(0);
  const [creditLimit, setCreditLimit] = useState(0);
  const [interest, setInterest] = useState(0);
  const [paymentDueDate, setPaymentDueDate] = useState("-");
  const [fee, setFee] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useAutoEffect(() => {
    let isMounted = true;

    const getTransactionsData = async () => {
      try {
        if (isMounted && isMember === true) {
          const borrowTxs = await getBorrowTransactions(
            curToken,
            library.getSigner(),
            chainId
          );

          const repayTxs = await getRepayTransactions(
            curToken,
            library.getSigner(),
            chainId
          );

          let txs = [].concat(borrowTxs, repayTxs);

          txs.sort((x, y) => {
            if (x.blockNumber > y.blockNumber) return -1;

            if (x.blockNumber < y.blockNumber) return 1;

            return 0;
          });

          setTransactions(txs);
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    };

    const getBorrowedData = async () => {
      try {
        if (isMounted && isMember === true) {
          const res = await getBorrowed(account, curToken, library, chainId);

          setBorrowed(res.toFixed(2));
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    };

    const getCreditData = async () => {
      try {
        if (isMounted && isMember === true) {
          const res = await getCreditLimit(curToken, account, library, chainId);

          setCreditLimit(res.toFixed(2));
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    };

    const getOriginationFeeData = async () => {
      try {
        if (isMounted && isMember === true) {
          const res = await getOriginationFee(curToken, library, chainId);

          setFee(res.toFixed(4));
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    };

    const getInterestData = async () => {
      try {
        if (isMounted && isMember === true) {
          const res = await getInterest(curToken, account, library, chainId);

          setInterest(res.toFixed(4));
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    };

    const getPaymentDueDate = async () => {
      try {
        if (isMounted && isMember === true) {
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

          const lastRepay = await getLastRepay(
            curToken,
            account,
            library,
            chainId
          );

          const overdueBlocks = await getOverdueBlocks(
            curToken,
            library,
            chainId
          );

          const curBlock = await library.getBlockNumber();

          if (lastRepay == 0) {
            setPaymentDueDate("No Payment Due");
            return;
          }

          const days = (
            ((lastRepay + overdueBlocks - curBlock) * blockSpeed[chainId]) /
            86400
          ).toFixed(2);

          setPaymentDueDate(`in ${days} days`);
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    };

    getCreditData();
    getBorrowedData();
    getInterestData();
    getPaymentDueDate();
    getOriginationFeeData();
    getTransactionsData();

    return () => {
      isMounted = false;
    };
  });

  const onBorrow = useAutoCallback(async (amount) => {
    try {
      await borrow(curToken, amount, library.getSigner(), chainId);
    } catch (err) {
      console.error(err);
    }
  });

  const onRepay = useAutoCallback(async (amount) => {
    try {
      await repay(curToken, amount, library.getSigner(), chainId);
    } catch (err) {
      console.error(err);
    }
  });

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
                  value={creditLimit}
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
                  <div className="flex items-center" title={utilizedStakeTip}>
                    <div className="mr-2">Percent Utilization</div>
                    <Info light />
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
                      health={getPercentUtilized(borrowed, creditLimit) * 100}
                      dark
                    />
                  </div>
                </dd>
              </dl>

              <div className="flex justify-between py-2">
                <Link href="/vouch">
                  <a className="underline text-sm">See my breakdown</a>
                </Link>
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
                  value={borrowed}
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
                value={interest}
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
            {transactions.length > 0 &&
              transactions.map((datum, i) => (
                <Transaction key={i} {...datum} />
              ))}
          </div>
        )}
      </div>

      <BorrowModal
        balanceOwed={borrowed}
        creditLimit={creditLimit}
        paymentDueDate={paymentDueDate}
        fee={fee}
        onBorrow={onBorrow}
      />
      <RepayModal balanceOwed={borrowed} onRepay={onRepay} />
    </Fragment>
  );
}
