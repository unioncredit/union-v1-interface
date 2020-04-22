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

        <div className="mx-auto max-w-4xl">
          <div className="md:flex">
            <div className="md:flex-1 mb-8">
              <div className="mb-8 mx-auto h-12 w-12 rounded-full border border-pink-pure text-xl font-semibold leading-12 text-center">
                1
              </div>
              <p>
                Send this link as a <strong>private message</strong> to someone
                you already know is a memeber.
              </p>
            </div>
            <div className="px-20">
              <div className="h-full w-px bg-pink-pure"></div>
            </div>
            <div className="md:flex-1 mb-8">
              <div className="mb-8 mx-auto h-12 w-12 rounded-full border border-pink-pure text-xl font-semibold leading-12 text-center">
                2
              </div>
              <p>
                Or submit a <strong>post</strong> on{" "}
                <strong>social media</strong> asking your friends whether one of
                them can vouch for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GetInvitedModal;
