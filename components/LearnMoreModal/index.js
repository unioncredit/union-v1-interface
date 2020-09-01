import { useGetInvitedModalToggle } from "components/GetInvitedModal/state";
import { useRouter } from "next/router";
import { Solo, Together } from "../benefits";
import Modal, { CloseButton } from "../modal";
import { useLearnMoreModalOpen, useLearnMoreModalToggle } from "./state";

const LearnMoreModal = () => {
  const open = useLearnMoreModalOpen();
  const toggle = useLearnMoreModalToggle();

  const toggleGetInvitedModal = useGetInvitedModalToggle();

  const router = useRouter();

  const handleStartStaking = async () => {
    await router.push("/stake");

    toggle();
  };

  const handleSwapModals = async () => {
    toggleGetInvitedModal();

    toggle();
  };

  return (
    <Modal style="FULLSCREEN" isOpen={open} onDismiss={toggle}>
      <div className="container mt-10 sm:mt-20">
        <div className="text-center mb-10">
          <CloseButton onClick={toggle} circle />
        </div>

        <h2 className="text-center text-3xl mb-10 hidden md:block">
          All the benefits of joining Union
        </h2>

        <div className="mx-auto max-w-3xl">
          <div className="md:flex md:space-x-4">
            <div className="md:w-1/2 mb-6">
              <Solo onClick={handleStartStaking} hasButton />
            </div>
            <div className="md:w-1/2 mb-6">
              <Together onClick={handleSwapModals} hasButton />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LearnMoreModal;
