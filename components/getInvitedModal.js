import {
  useGetInvitedModalOpen,
  useGetInvitedModalToggle,
} from "@contexts/Application";
import Modal, { CloseButton } from "./modal";

const GetInvitedModal = () => {
  const open = useGetInvitedModalOpen();
  const toggle = useGetInvitedModalToggle();

  return (
    <Modal isOpen={open} onDismiss={toggle} className="fullscreen">
      <div className="max-w-lg mx-auto text-center mt-10 sm:mt-20">
        <CloseButton onClick={toggle} circle />

        <h2 className="text-3xl mb-4 mt-10">How to become a member?</h2>

        <p className="text-lg text-grey-pure leading-tight mb-4">
          Joining Union is invite only, it means that someone who is already a
          member needs to vouch for you.
        </p>

        <p className="text-lg mb-4">
          Here are 2 simple ways to become a member.
        </p>

        <p className="text-center mb-10">
          <a href="#!" className="underline font-medium">
            Learn more
          </a>
        </p>
      </div>
    </Modal>
  );
};

export default GetInvitedModal;
