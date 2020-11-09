import Button from "components/button";
import { Select } from "components/input";
import Modal, { ModalHeader } from "components/modal";
import useGovernanceContract from "hooks/governance/useGovernanceContract";
import useSWR from "swr";
import {
  useProposalActionsModalOpen,
  useProposalActionsModalToggle,
} from "./state";

const getGovernanceContractFunctions = (contract) => () => {
  return contract?.interface?.functions;
};

const useGovernanceContractFunctions = () => {
  const contract = useGovernanceContract();

  return useSWR(
    "GovernanceContractFunctions",
    getGovernanceContractFunctions(contract)
  );
};

const ProposalActionsModal = () => {
  const open = useProposalActionsModalOpen();
  const toggle = useProposalActionsModalToggle();

  useGovernanceContractFunctions();

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Add action" onDismiss={toggle} />

      <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6">
        <Select label="Select Target" autoFocus />

        {/* Spacer */}
        <div className="h-4" />

        <Select label="Select Function" />

        {/* Spacer */}
        <div className="h-8" />

        <Button full disabled>
          Add action
        </Button>
      </div>
    </Modal>
  );
};

export default ProposalActionsModal;
