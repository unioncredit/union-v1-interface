import Modal, { ModalHeader } from "components/modal";
import {
  useDelegateVotingModalOpen,
  useDelegateVotingModalToggle,
} from "./state";

const DelegateVotingModal = () => {
  const open = useDelegateVotingModalOpen();
  const toggle = useDelegateVotingModalToggle();

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Delegate Voting" onDismiss={toggle} />
      <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse beatae
        dolores nam. Officiis cumque porro alias sunt iste sed itaque architecto
        dolore. Saepe laborum illo labore nemo magnam, illum voluptas?
      </div>
    </Modal>
  );
};

export default DelegateVotingModal;

export const ViewDelegateVoting = () => {
  const toggle = useDelegateVotingModalToggle();

  /**
   * @todo Hook up to contract to check if user is delegating their votes
   */
  const isDelegating = false;

  return (
    <button
      className="text-sm font-semibold underline rounded focus:outline-none focus:shadow-outline"
      onClick={toggle}
    >
      {isDelegating ? "Change" : "Delegate your votes"}
    </button>
  );
};
