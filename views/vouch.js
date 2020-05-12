import ApplicationCard from "components/applicationCard";
import Button from "components/button";
import CreditRequestModal from "components/creditRequestModal";
import LabelPair from "components/labelPair";
import VouchBar from "components/vouchBar";
import VouchTable from "components/vouchTable";
import { useCreditRequestModalToggle } from "contexts/Vouch";
import { useCreditLimitData, useVouchData } from "hooks/swrHooks";
import useIsMember from "hooks/useIsMember";
import { Fragment } from "react";
import getVouchBarData from "util/getVouchBarData";

export default function VouchView() {
  const isMember = useIsMember();

  const toggleCreditRequestModal = useCreditRequestModalToggle();

  const { data: vouchData } = useVouchData();

  const { data: creditLimit = 0 } = useCreditLimitData();

  return (
    <Fragment>
      <div className="container">
        {isMember === false && <ApplicationCard />}

        <div className="flex justify-between mb-6">
          <LabelPair
            label="Real-time available credit"
            value={creditLimit.toFixed(2)}
            valueType="DAI"
            tooltip={"Lorem ipsum dolor sit amet consectetur adipisicing elit."}
            large
          />

          <div className="hidden md:block">
            <Button invert onClick={toggleCreditRequestModal}>
              Open request for credit
            </Button>
          </div>
        </div>

        <VouchBar className="mb-10" slices={getVouchBarData(vouchData)} />

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
    </Fragment>
  );
}
