import { useLearnMoreModalToggle } from "@contexts/Application";
import { useTutorialModalOpen, useTutorialModalToggle } from "@contexts/Stake";
import VisuallyHidden from "@reach/visually-hidden";
import { setCookie } from "nookies";
import { Fragment } from "react";
import { useStateList } from "react-use";
import Button from "./button";
import Modal from "./modal";

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
      <div className="flex justify-end px-4 sm:px-6 pt-4 sm:pt-6 pb-4">
        <button
          className="focus:outline-none focus:shadow-outline leading-none p-2 rounded inline-flex"
          onClick={handleToggle}
        >
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden className="w-4" role="img">
            ❌
          </span>
        </button>
      </div>

      <div
        className="flex flex-col px-4 sm:px-6 pb-4 sm:pb-6"
        style={{ minHeight: 400 }}
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
              <div className="h-24 w-48 mx-auto bg-border-pure" />
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
                  className="h-12 bg-border-pure focus:outline-none focus:shadow-outline rounded-full w-12"
                  onClick={prev}
                >
                  <span role="img" aria-label="Arrow Left">
                    ◀️
                  </span>
                </button>
              </div>
            )}
            <div className="px-3">
              <button
                className="h-12 bg-border-pure focus:outline-none focus:shadow-outline rounded-full w-12"
                onClick={next}
              >
                <span role="img" aria-label="Arrow Right">
                  ▶️
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TutorialModal;
