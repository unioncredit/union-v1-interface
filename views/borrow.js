import { useWeb3React } from "@web3-react/core";
import ApplicationCard from "components/applicationCard";
import BorrowModal from "components/borrowModal";
import Button from "components/button";
import LabelPair from "components/labelPair";
import RepayModal from "components/repayModal";
import Transaction from "components/transaction";
import UtilizationBar from "components/utilizationBar";
import { blockSpeed } from "constants/variables";
import { useBorrowModalToggle, useRepayModalToggle } from "contexts/Borrow";
import { useAutoEffect } from "hooks.macro";
import { useTransactions } from "hooks/swrHooks";
import useCreditLimit from "hooks/useCreditLimit";
import useCurrentToken from "hooks/useCurrentToken";
import useIsMember from "hooks/useIsMember";
import { checkIsOverdue } from "lib/contracts/checkIsOverdue";
import { getBorrowed } from "lib/contracts/getBorrowed";
import { getBorrowRate } from "lib/contracts/getBorrowRate";
import { getInterest } from "lib/contracts/getInterest";
import { getLastRepay } from "lib/contracts/getLastRepay";
import { getOriginationFee } from "lib/contracts/getOriginationFee";
import { getOverdueBlocks } from "lib/contracts/getOverdueBlocks";
import Link from "next/link";
import { Fragment, useState } from "react";
import Info from "svgs/Info";
import { roundUp } from "util/numbers";
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
  const [interest, setInterest] = useState(0);
  const [paymentDueDate, setPaymentDueDate] = useState("-");
  const [fee, setFee] = useState(0);
  const [apr, setApr] = useState(0);

  const {
    data: transactionsData,
    mutate: updateTransactionsData,
  } = useTransactions();

  const { data: creditLimit = 0, mutate: updateCreditLimit } = useCreditLimit();

  useAutoEffect(() => {
    let isMounted = true;

    const getAprData = async () => {
      try {
        if (isMounted && isMember === true) {
          const res = await getBorrowRate(curToken, library, chainId);
          setApr(res);
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
          setBorrowed(Math.ceil(parseFloat(res.toFixed(18)) * 10000) / 10000);
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
          setInterest(Math.ceil(parseFloat(res.toFixed(18)) * 10000) / 10000);
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

    getBorrowedData();
    getInterestData();
    getPaymentDueDate();
    getOriginationFeeData();
    getAprData();

    return () => {
      isMounted = false;
    };
  });

  const formatApr = Number(apr).toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const onComplete = () => {
    updateTransactionsData();
    updateCreditLimit();
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
                  value={creditLimit.toFixed(2)}
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
                      {getPercentUtilized(
                        borrowed,
                        parseFloat(creditLimit) + parseFloat(borrowed)
                      ).toLocaleString(undefined, {
                        style: "percent",
                        maximumFractionDigits: 0,
                      })}
                    </p>
                    <UtilizationBar
                      usage={
                        getPercentUtilized(
                          borrowed,
                          parseFloat(creditLimit) + parseFloat(borrowed)
                        ) * 100
                      }
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
                  value={roundUp(borrowed)}
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
            {transactionsData &&
              transactionsData.length > 0 &&
              transactionsData.map((datum, i) => (
                <Transaction key={i} {...datum} />
              ))}
          </div>
        )}
      </div>

      <BorrowModal
        balanceOwed={borrowed}
        creditLimit={creditLimit}
        fee={fee}
        onComplete={onComplete}
        paymentDueDate={paymentDueDate}
      />

      <RepayModal balanceOwed={borrowed} onComplete={onComplete} />
    </Fragment>
  );
}
