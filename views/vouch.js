import ApplicationCard from "@components/applicationCard";
import Button from "@components/button";
import CreditRequestModal from "@components/creditRequestModal";
import LabelPair from "@components/labelPair";
import VouchBar from "@components/vouchBar";
import VouchTable from "@components/vouchTable";
import { useCreditRequestModalToggle } from "@contexts/Vouch";
import { useVouchData } from "@hooks/swrHooks";
import useCurrentToken from "@hooks/useCurrentToken";
import useIsMember from "@hooks/useIsMember";
import { getTotalVouchedForYou } from "@lib/contracts/getTotalVouchedForYou";
import getVouchBarData from "@util/getVouchBarData";
import { useWeb3React } from "@web3-react/core";
import { useAutoEffect } from "hooks.macro";
import { Fragment, useState } from "react";

export default function VouchView() {
  const { account, library, chainId } = useWeb3React();

  const curToken = useCurrentToken();

  const isMember = useIsMember();

  const toggleCreditRequestModal = useCreditRequestModalToggle();

  const [totalVouched, setTotalVouched] = useState(0);

  const { data: vouchData } = useVouchData();

  useAutoEffect(() => {
    let isMounted = true;

    const getCreditData = async () => {
      try {
        if (isMounted) {
          const res = await getTotalVouchedForYou(
            curToken,
            library.getSigner(),
            chainId
          );
          setTotalVouched(res.toFixed(2));
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    };

    getCreditData();

    return () => {
      isMounted = false;
    };
  });

  return (
    <Fragment>
      <div className="container">
        {isMember === false && <ApplicationCard />}

        <div className="flex justify-between mb-6">
          <LabelPair
            label="Real-time available credit"
            value={totalVouched}
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
