import { useWeb3React } from "@web3-react/core";
import Button from "components/button";
import Modal, { ModalHeader } from "components/modal";
import Skeleton from "components/Skeleton";
import useQueue from "hooks/payables/useQueue";
import useProposalData from "hooks/governance/useProposalData";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import {
  useProposalQueueModalOpen,
  useProposalQueueModalToggle,
} from "./state";
import useAllProposalData from "hooks/governance/useAllProposalData";

const ProposalQueueModal = ({ id }) => {
  const { library } = useWeb3React();

  const open = useProposalQueueModalOpen();
  const toggle = useProposalQueueModalToggle();

  const { mutate: updateProposalData } = useAllProposalData();

  const data = useProposalData(id);

  /**
   * Vote Handling
   */
  const { handleSubmit, reset, formState } = useForm();
  const { isSubmitting } = formState;

  useEffect(() => {
    reset();
  }, [open]);

  const queue = useQueue();

  const onSubmit = async () => {
    try {
      const { hash } = await queue(id);
      if (open) toggle();
      await getReceipt(hash, library);
      await updateProposalData();
    } catch (err) {
      handleTxError(err);
    }
  };

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Queue" onDismiss={toggle} />
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6"
      >
        <p className="text-xl font-semibold">{data?.title ?? <Skeleton />}</p>

        {/* Spacer */}
        <div className="h-12" />

        <Button
          full
          type="submit"
          submitting={isSubmitting}
          submittingText="Queue this proposal..."
          disabled={isSubmitting}
        >
          Confirm Queue
        </Button>
      </form>
    </Modal>
  );
};

export default ProposalQueueModal;
