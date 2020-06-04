import { useLearnMoreModalToggle } from "components/LearnMoreModal";
import { setCookie } from "nookies";
import { Fragment } from "react";
import { useStateList } from "react-use";
import Chevron from "svgs/Chevron";
import Button from "../button";
import Modal, { CloseButton } from "../modal";
import { useTutorialModalOpen, useTutorialModalToggle } from "./state";

const TUTORIAL_VIEWS = ["FIRST", "SECOND", "THIRD", "FOURTH"];

const TutorialModal = () => {
  const open = useTutorialModalOpen();
  const toggle = useTutorialModalToggle();

  const toggleLearnMoreModal = useLearnMoreModalToggle();

  const { state, prev, next } = useStateList(TUTORIAL_VIEWS);

  const completeTutorial = () =>
    setCookie(null, "tutorial_modal_completed", true, {
      maxAge: 30 * 24 * 60 * 60,
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
    });

  const handleToggle = () => {
    completeTutorial();
    toggle();
  };

  const handleLearnMore = () => {
    completeTutorial();
    toggleLearnMoreModal();
    toggle();
  };

  return (
    <Modal isOpen={open} onDismiss={handleToggle}>
      <div className="flex justify-end p-4 sm:p-6">
        <CloseButton onClick={handleToggle} />
      </div>

      <div
        className="flex flex-col px-4 sm:px-6 pb-4 sm:pb-8"
        style={{ minHeight: 480 }}
      >
        {state === "FIRST" && (
          <article className="text-center">
            <div className="w-24 h-24 rounded-full mx-auto bg-border-pure" />
            <h2 className="mt-4 mb-2 text-xl">Stake</h2>
            <p className="mb-4">Step 1</p>
            <p className="leading-tight text-grey-pure">
              Staked amount will be deposited in a lending pool in a way that
              the principal and interest are both accounted for
            </p>
          </article>
        )}

        {state === "SECOND" && (
          <article className="text-center">
            <div className="w-24 h-24 rounded-full mx-auto bg-border-pure" />
            <h2 className="mt-4 mb-2 text-xl">Trust a Member</h2>
            <p className="mb-4">Step 2</p>
            <p className="leading-tight text-grey-pure">
              Trusting a member means that you are trusting this person with a
              specific amount. The member will have access to your stake pool.
              They will pay you back the amount + interest.
            </p>
          </article>
        )}

        {state === "THIRD" && (
          <article className="text-center">
            <div className="w-24 h-24 rounded-full mx-auto bg-border-pure" />
            <h2 className="mt-4 mb-4 text-xl">
              You can trust more people with the amount you stake
            </h2>
            <p className="leading-tight text-grey-pure">
              You can trust more people with the amount you stake. Manage who
              you trust, and the amount you trust them with, reduce it or
              increase as you prefer.
            </p>
          </article>
        )}

        {state === "FOURTH" && (
          <Fragment>
            <article className="text-center">
              <div className="flex justify-center">
                <img src="/images/logged-out.svg" className="w-56" alt="" />
              </div>

              <h2 className="mt-8 mb-4 text-xl">Join Union</h2>
              <p className="leading-tight text-grey-pure">
                Joining Union is invite only, it means that 3 people who are
                already members needs to vouch for you.
              </p>
            </article>

            <div className="mt-auto">
              <Button onClick={handleToggle} full className="mb-4">
                Start staking
              </Button>
              <Button onClick={handleLearnMore} full invert>
                Learn more
              </Button>
            </div>
          </Fragment>
        )}

        {state !== "FOURTH" && (
          <div className="flex justify-center mt-auto">
            {state !== "FIRST" && (
              <div className="px-3">
                <button
                  className="h-12 w-12 flex items-center justify-center bg-border-pure focus:outline-none focus:shadow-outline rounded-full"
                  onClick={prev}
                >
                  <Chevron.Left />
                </button>
              </div>
            )}
            <div className="px-3">
              <button
                className="h-12 w-12 flex items-center justify-center bg-border-pure focus:outline-none focus:shadow-outline rounded-full"
                onClick={next}
              >
                <Chevron.Right />
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TutorialModal;

export { useTutorialModalOpen, useTutorialModalToggle };
