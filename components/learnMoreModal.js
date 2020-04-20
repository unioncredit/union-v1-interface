import {
  useLearnMoreModalOpen,
  useLearnMoreModalToggle,
} from "@contexts/Application";
import Modal from "./modal";

const LearnMoreModal = () => {
  const open = useLearnMoreModalOpen();
  const toggle = useLearnMoreModalToggle();

  return (
    <Modal isOpen={open} onDismiss={toggle} className="fullscreen">
      <div className="max-w-lg mx-auto text-center mt-10 sm:mt-20">
        <button
          className="h-12 w-12 rounded-full bg-white text-type-lighter focus:outline-none"
          style={{ boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.13)" }}
          onClick={toggle}
        >
          <span role="img" aria-label="Close">
            ❌
          </span>
        </button>

        <h2 className="text-3xl mb-4 mt-10">
          All the benefits of joining Union
        </h2>
      </div>
    </Modal>
  );
};

export default LearnMoreModal;
