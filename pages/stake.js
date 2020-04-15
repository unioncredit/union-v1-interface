import Button from "@components/button";
import StakeCard from "@components/stakeCard";
import StakeTable from "@components/stakeTable";
import TrustModal from "@components/trustModal";
import TutorialModal from "@components/tutorialModal";
import { useEmailModalToggle } from "@contexts/Application";
import { useTrustModalToggle, useTutorialModalToggle } from "@contexts/Stake";
import useCurrentToken from "@hooks/useCurrentToken";
import { vouch } from "@lib/contracts/vouch";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect } from "react";

export default function Stake() {
  const { account, library, chainId } = useWeb3React();

  const { query } = useRouter();

  const toggleTrustModal = useTrustModalToggle();
  const toggleEmailModal = useEmailModalToggle();
  const toggleTutorialModal = useTutorialModalToggle();

  const curToken = useCurrentToken();

  const { email_modal_completed, tutorial_modal_completed } = parseCookies();

  useEffect(() => {
    if (!email_modal_completed) {
      toggleEmailModal();
    }
    if (!!email_modal_completed && !tutorial_modal_completed) {
      toggleTutorialModal();
    }
  }, [email_modal_completed, tutorial_modal_completed]);

  /**
   * @note Rename query parameters to indicate where theyre coming from
   */
  const { trust: paramTrust, address: paramAddress } = query;

  useEffect(() => {
    if (library && account && paramTrust && paramAddress) {
      toggleTrustModal();
    }
  }, [library, account, query]);

  const onTrust = async (address, amount) => {
    try {
      await vouch(address, curToken, amount, library.getSigner(), chainId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-10">
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
            <StakeTable />
          </div>
        </div>
      </div>

      <TrustModal
        onTrust={onTrust}
        initialAddress={paramAddress ?? undefined}
        initialTrust={paramTrust ?? undefined}
      />
      <TutorialModal />
    </div>
  );
}
