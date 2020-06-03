import Button from "components/button";
import StakeCard from "components/stakeCard";
import StakeTable from "components/stakeTable";
import TrustModal from "components/trustModal";
import TutorialModal from "components/tutorialModal";
import { useEmailModalToggle } from "states/Application";
import { useTrustModalToggle, useTutorialModalToggle } from "contexts/Stake";
import { useAutoEffect } from "hooks.macro";
import useIsMember from "hooks/useIsMember";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { Fragment } from "react";

export default function StakeView() {
  const { query } = useRouter();

  const toggleTrustModal = useTrustModalToggle();
  const toggleEmailModal = useEmailModalToggle();
  const toggleTutorialModal = useTutorialModalToggle();

  const { email_modal_completed, tutorial_modal_completed } = parseCookies();

  const { data: isMember = false } = useIsMember();

  useAutoEffect(() => {
    if (!email_modal_completed) {
      toggleEmailModal();
    }
    if (!!email_modal_completed && !tutorial_modal_completed) {
      toggleTutorialModal();
    }
  });

  useAutoEffect(() => {
    if (query.address || query.trust) {
      toggleTrustModal();
    }
  });

  return (
    <Fragment>
      <div className="container">
        <div className="flex flex-col md:flex-row -mx-2 ">
          <div className="w-full md:476px px-2 mb-12 md:mb-0">
            <h1 className="hidden md:block mb-4 h-12 leading-12">Stake</h1>
            <StakeCard />
          </div>

          <div className="w-full px-2">
            <div className="flex flex-col h-full">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 md:mb-4">
                <h2 className="mb-4 md:mb-0">Addresses You Trust</h2>

                <Button
                  disabled={isMember === true ? false : true}
                  onClick={toggleTrustModal}
                  invert
                >
                  Trust a new member
                </Button>
              </div>
              <div className="flex-1">
                <StakeTable />
              </div>
            </div>
          </div>
        </div>
      </div>

      <TrustModal
        initialAddress={query.address ?? undefined}
        initialTrust={query.trust ?? undefined}
      />

      <TutorialModal />
    </Fragment>
  );
}
