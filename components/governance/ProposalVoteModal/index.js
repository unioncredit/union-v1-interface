import Button from "components/button";
import Modal, { ModalHeader } from "components/modal";
import useProposalData from "hooks/governance/useProposalData";
import { useProposalVoteModalOpen, useProposalVoteModalToggle } from "./state";

const ProposalVoteModal = ({ id }) => {
  const open = useProposalVoteModalOpen();
  const toggle = useProposalVoteModalToggle();

  const data = useProposalData(id);

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Vote" onDismiss={toggle} />
      <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6">
        <p className="text-xl font-semibold">{data?.title}</p>

        {/* Spacer */}
        <div className="h-8" />

        <p>How would you like to vote?</p>

        {/* Spacer */}
        <div className="h-12" />

        <Button full disabled>
          Confirm vote
        </Button>
      </div>
    </Modal>
  );
};

export default ProposalVoteModal;
