import ApplicationCard from "components/applicationCard";
import Button from "components/button";
import CreditRequestModal from "components/CreditRequestModal";
import { useCreditRequestModalToggle } from "components/CreditRequestModal/state";
import LabelPair from "components/labelPair";
import SuccessModal from "components/SuccessModal";
import VouchBar from "components/vouchBar";
import VouchTable from "components/vouchTable";
import useCreditLimit from "hooks/useCreditLimit";
import useIsMember from "hooks/useIsMember";
import useVouchData from "hooks/useVouchData";
import { Fragment } from "react";
import Skeleton from "styled-jsx-loading-skeleton";
import getVouchBarData from "util/getVouchBarData";
import { roundDown } from "util/numbers";

export default function VouchView() {
  const { data: isMember = false } = useIsMember();

  const toggleCreditRequestModal = useCreditRequestModalToggle();

  const { data: vouchData } = useVouchData();
  const vouchBarSlices = getVouchBarData(vouchData);

  const { data: creditLimit } = useCreditLimit();

  return (
    <Fragment>
      <div className="container">
        {isMember === false && <ApplicationCard />}

        <div className="flex justify-between mb-6">
          <LabelPair
            label="Real-time available credit"
            {...(creditLimit
              ? { value: roundDown(creditLimit), valueType: "DAI" }
              : { value: <Skeleton width={72} /> })}
            large
          />

          <div className="hidden md:block">
            <Button invert onClick={toggleCreditRequestModal}>
              Open request for credit
            </Button>
          </div>
        </div>

        <div className="mb-10">
          {vouchData ? (
            <VouchBar slices={vouchBarSlices} />
          ) : (
            <Skeleton height={64} style={{ display: "block" }} />
          )}
        </div>

        <div className="mb-6">
          <h1>Addresses who vouched for you</h1>

          <Button
            full
            invert
            onClick={toggleCreditRequestModal}
            className="mt-6 inline-block md:hidden"
          >
            Open request for credit
          </Button>
        </div>

        <VouchTable data={vouchData} />
      </div>

      <CreditRequestModal />

      <SuccessModal />
    </Fragment>
  );
}
