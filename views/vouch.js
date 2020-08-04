import ApplicationCard from "components/applicationCard";
import Button from "components/button";
import CreditRequestModal from "components/CreditRequestModal";
import { useCreditRequestModalToggle } from "components/CreditRequestModal/state";
import VouchTable from "components/vouchTable";
import useIsMember from "hooks/useIsMember";
import useVouchData from "hooks/useVouchData";
import { Fragment } from "react";

export default function VouchView() {
  const { data: isMember } = useIsMember();

  const toggleCreditRequestModal = useCreditRequestModalToggle();

  const { data: vouchData } = useVouchData();

  return (
    <Fragment>
      <div className="container">
        {isMember === false && <ApplicationCard />}

        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 md:mb-4">
          <h1 className="h-12 leading-12 mb-4 md:mb-0">
            Addresses Who Vouched for You
          </h1>

          <Button invert onClick={toggleCreditRequestModal}>
            Open request for credit
          </Button>
        </div>

        <VouchTable data={vouchData} />
      </div>

      <CreditRequestModal />
    </Fragment>
  );
}
