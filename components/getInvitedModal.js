import {
  useGetInvitedModalOpen,
  useGetInvitedModalToggle,
  useLearnMoreModalToggle,
} from "@contexts/Application";
import Modal, { CloseButton } from "./modal";

const GetInvitedModal = () => {
  const open = useGetInvitedModalOpen();
  const toggle = useGetInvitedModalToggle();

  const toggleLearnMoreModal = useLearnMoreModalToggle();

  const handleSwapModals = async () => {
    await toggleLearnMoreModal();
    toggle();
  };

  return (
    <Modal isOpen={open} onDismiss={toggle} className="fullscreen">
      <div className="container text-center mt-10 sm:mt-20">
        <CloseButton onClick={toggle} circle />

        <h2 className="text-3xl mb-4 mt-10">How to become a member?</h2>

        <p className="text-lg max-w-xl mx-auto text-grey-pure leading-tight mb-4">
          Joining Union is invite only, it means that someone who is already a
          member needs to vouch for you.
        </p>

        <p className="text-lg mb-4">
          Here are 2 simple ways to become a member.
        </p>

        <p className="text-center mb-10">
          <button onClick={handleSwapModals} className="underline font-medium">
            Learn more
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default GetInvitedModal;
