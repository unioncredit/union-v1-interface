import ApplicationCard from "components/applicationCard";
import Button from "components/button";
import CreditRequestModal from "components/creditRequestModal";
import LabelPair from "components/labelPair";
import VouchBar from "components/vouchBar";
import VouchTable from "components/vouchTable";
import { useCreditRequestModalToggle } from "contexts/Vouch";
import { useVouchData } from "hooks/swrHooks";
import useCreditLimit from "hooks/useCreditLimit";
import useIsMember from "hooks/useIsMember";
import { Fragment } from "react";
import getVouchBarData from "util/getVouchBarData";
import { roundDown } from "util/numbers";

export default function VouchView() {
    const { data: isMember = false } = useIsMember();

    const toggleCreditRequestModal = useCreditRequestModalToggle();

    const { data: vouchData } = useVouchData();

    const { data: creditLimit = 0 } = useCreditLimit();
    console.log({ vouchData });
    const vouchTotal =
        !!vouchData &&
        vouchData.length > 0 &&
        vouchData
            .map(({ vouched }) => Number(vouched))
            .reduce((acc, cur) => acc + cur);

    return (
        <Fragment>
            <div className="container">
                {isMember === false && <ApplicationCard />}

                <div className="flex justify-between mb-6">
                    <LabelPair
                        label="Real-time available credit"
                        value={roundDown(creditLimit)}
                        valueType="DAI"
                        tooltip={
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        }
                        large
                    />

                    <div className="hidden md:block">
                        <Button invert onClick={toggleCreditRequestModal}>
                            Open request for credit
                        </Button>
                    </div>
                </div>

                <VouchBar
                    className="mb-10"
                    slices={getVouchBarData(vouchData)}
                />

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

                <VouchTable data={vouchData} sum={vouchTotal} />
            </div>

            <CreditRequestModal />
        </Fragment>
    );
}
