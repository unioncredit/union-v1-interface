import Button from "@components/button";
import StakeCard from "@components/stakeCard";
import StakeTable from "@components/stakeTable";
import TrustModal from "@components/trustModal";
import TutorialModal from "@components/tutorialModal";
import { useEmailModalToggle } from "@contexts/Application";
import { useTrustModalToggle, useTutorialModalToggle } from "@contexts/Stake";
import useCurrentToken from "@hooks/useCurrentToken";
import { getTrust } from "@lib/contracts/getTrust";
import { vouch } from "@lib/contracts/vouch";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useEffect, useMemo, useState } from "react";

export default function Stake() {
  const { account, library, chainId } = useWeb3React();
  const toggleTrustModal = useTrustModalToggle();
  const toggleEmailModal = useEmailModalToggle();
  const toggleTutorialModal = useTutorialModalToggle();

  const curToken = useCurrentToken();

  const [trustData, setTrustData] = useState([]);

  const { email_modal_completed, tutorial_modal_completed } = parseCookies();

  useEffect(() => {
    if (!email_modal_completed) {
      toggleEmailModal();
    }
    if (!!email_modal_completed && !tutorial_modal_completed) {
      toggleTutorialModal();
    }
  }, [email_modal_completed, tutorial_modal_completed]);

  useEffect(() => {
    if (library && account) {
      getTrustData();
    }
  }, [library, account]);

  const getTrustData = async () => {
    const res = await getTrust(account, curToken, library, chainId);
    setTrustData(res);
  };

  const onTrust = async (address, amount) => {
    await vouch(address, curToken, amount, library.getSigner(), chainId);
  };

  const stakeTableData = useMemo(() => trustData, [trustData]);

  return (
    <div>
      <Head>
        <title>Stake | Union</title>
      </Head>

      <div className="container">
        <div className="flex -mx-2 mb-4">
          <div className="w-5/12 px-2">
            <h1 className="leading-loose">Stake</h1>
          </div>

          <div className="w-7/12 px-2">
            <div className="flex justify-between items-center">
              <h2 className="leading-loose">Addresses You Trust</h2>

              <Button invert onClick={toggleTrustModal}>
                Trust a new member
              </Button>
            </div>
          </div>
        </div>

        <div className="flex -mx-2">
          <div className="w-5/12 px-2">
            <StakeCard />
          </div>

          <div className="w-7/12 px-2">
            <StakeTable data={stakeTableData} />
          </div>
        </div>
      </div>

      <TrustModal onTrust={onTrust} />
      <TutorialModal />
    </div>
  );
}
