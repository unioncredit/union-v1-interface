import ApplicationCard from "@components/applicationCard";
import Button from "@components/button";
import CreditRequestModal from "@components/creditRequestModal";
import LabelPair from "@components/labelPair";
import VouchBar from "@components/vouchBar";
import VouchTable from "@components/vouchTable";
import { useCreditRequestModalToggle } from "@contexts/Vouch";
import useCurrentToken from "@hooks/useCurrentToken";
import { getCreditLimit } from "@lib/contracts/getCreditLimit";
import { getVouched } from "@lib/contracts/getVouched";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import { useEffect, useState } from "react";

/**
 * @name getVouchBarData
 * @param {Array} vouchData
 */
const getVouchBarData = (vouchData) =>
  vouchData.length > 0
    ? vouchData.map(({ vouched }) => parseFloat(vouched))
    : [];

export default function Vouch() {
  const { account, library, chainId } = useWeb3React();

  const curToken = useCurrentToken();

  const toggleCreditRequestModal = useCreditRequestModalToggle();

  const [creditLimit, setCreditLimit] = useState("N/A");
  const [vouchData, setVouchData] = useState([]);

  useEffect(() => {
    if (library && account) {
      getVouchData();
      getCreditData();
    }
  }, [library, account]);

  const getVouchData = async () => {
    const res = await getVouched(account, curToken, library, chainId);
    setVouchData(res);
  };

  const getCreditData = async () => {
    const res = await getCreditLimit(curToken, account, library, chainId);
    setCreditLimit(res.toFixed(4));
  };

  return (
    <div>
      <Head>
        <title>Vouch | Union</title>
      </Head>

      <div className="container">
        <ApplicationCard />

        <div className="flex justify-between mb-6">
          <LabelPair
            label="Total credit vouched for you"
            value={creditLimit}
            large
          />

          <div>
            <Button invert onClick={toggleCreditRequestModal}>
              Open request for credit
            </Button>
          </div>
        </div>

        <VouchBar className="mb-10" slices={getVouchBarData(vouchData)} />

        <div className="mb-6">
          <h1>Addresses who vouched for you</h1>
        </div>

        <VouchTable data={vouchData} />
      </div>

      <CreditRequestModal />
    </div>
  );
}
