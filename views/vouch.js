import ApplicationCard from "components/ApplicationCard";
import Button from "components/button";
import CreditRequestModal from "components/CreditRequestModal";
import { useCreditRequestModalToggle } from "components/CreditRequestModal/state";
import LabelPair from "components/labelPair";
import SuccessModal from "components/SuccessModal";
import VouchBar from "components/vouchBar";
import VouchTable from "components/VouchTable";
import useCreditLimit from "hooks/useCreditLimit";
import useIsMember from "hooks/useIsMember";
import useVouchData from "hooks/useVouchData";
import { Fragment } from "react";
import getVouchBarData from "util/getVouchBarData";
import { roundDown } from "util/numbers";

export default function VouchView() {
  const { data: isMember } = useIsMember();

  const toggleCreditRequestModal = useCreditRequestModalToggle();

  const { data: vouchData } = useVouchData();

  const { data: creditLimit = 0 } = useCreditLimit();

  const vouchBarData = getVouchBarData(vouchData);

  return (
    <Fragment>
      <div className="container">
        {isMember === false && <ApplicationCard />}

        <div className="flex justify-between mb-6">
          <LabelPair
            label="Real-time available credit"
            value={roundDown(creditLimit)}
            valueType="DAI"
            large
          />

          <div className="hidden md:block">
            <Button invert onClick={toggleCreditRequestModal}>
              Open request for credit
            </Button>
          </div>
        </div>

        <VouchBar className="mb-10" data={vouchBarData} />

        <div className="mb-4">
          <h1 className="h-12 leading-12">Addresses who vouched for you</h1>

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
