import ApplicationCard from "@components/applicationCard";
import Button from "@components/button";
import CreditRequestModal from "@components/creditRequestModal";
import LabelPair from "@components/labelPair";
import { TOKENS } from "@constants/";
import VouchBar from "@components/vouchBar";
import VouchTable from "@components/vouchTable";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useCreditRequestModalToggle } from "@contexts/Vouch";
import Head from "next/head";

import { getCreditLimit } from "@lib/contracts/getCreditLimit";
import { getTrustCount } from "@lib/contracts/getTrustCount";
import { getVouched } from "@lib/contracts/getVouched";

export default function Vouch() {
  const { account, library, chainId } = useWeb3React();

  const toggleCreditRequestModal = useCreditRequestModalToggle();

  const [creditLimit, setCreditLimit] = useState('N/A');
  const [trustCount, setTrustCount] = useState(0);
  const [vouchData, setVouchData] = useState([]);

  useEffect(() => {
    if (library) {
      getVouchData();
      getCreditData();
      getTrustCountData();
    }
  }, []);

  const getVouchData = async () => {
    const res = await getVouched(account, TOKENS[chainId]["DAI"], library, chainId);
    setVouchData(res);
  }

  const getCreditData = async () => {
    const res = await getCreditLimit(TOKENS[chainId]["DAI"], account, library, chainId);
    setCreditLimit(res.toString());
  }

  const getTrustCountData = async () => {
    const res = await getTrustCount(account, TOKENS[chainId]["DAI"], library, chainId);
    setTrustCount(res);
  }

  let slices = [];
  vouchData.forEach((v) => {
    slices.push(parseFloat(v.vouched));
  });

  return (
    <div>
      <Head>
        <title>Vouch | Union</title>
      </Head>

      <div className="container">
        <ApplicationCard count={trustCount} />

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

        <VouchBar className="mb-10" slices={slices} />

        <div className="mb-6">
          <h1>Addresses who vouched for you</h1>
        </div>

        <VouchTable data={vouchData} />
      </div>

      <CreditRequestModal />
    </div>
  );
}
