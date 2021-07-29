import { useWeb3React } from "@web3-react/core";
import Button from "components/button";
import Modal, { ModalHeader } from "components/modal";
import Skeleton from "components/Skeleton";
import useExecute from "hooks/payables/useExecute";
import useProposalData from "hooks/governance/useProposalData";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import {
  useProposalExecuteModalOpen,
  useProposalExecuteModalToggle,
} from "./state";
import useAllProposalData from "hooks/governance/useAllProposalData";
import LabelPair from "components/labelPair";
import { formatDueDate } from "util/formatDueDate";
import dayjs from "dayjs";

const ProposalExecuteModal = ({ id }) => {
  const { library } = useWeb3React();

  const open = useProposalExecuteModalOpen();
  const toggle = useProposalExecuteModalToggle();

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

  const execute = useExecute();

  const onSubmit = async () => {
    try {
      const { hash } = await execute(id);
      if (open) toggle();
      await getReceipt(hash, library);
      await updateProposalData();
    } catch (err) {
      handleTxError(err);
    }
  };

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Execute" onDismiss={toggle} />
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6"
      >
        <p className="text-xl font-semibold">{data?.title ?? <Skeleton />}</p>
        {/* Spacer */}
        <div className="h-8" />
        <LabelPair
          className="text-type-light pb-0"
          label="Execute start Date"
          value={dayjs(data?.eta * 1000).format("YYYY MMM D HH:mm")}
        />
        {/* Spacer */}
        <div className="h-12" />
        <Button
          full
          type="submit"
          submitting={isSubmitting}
          submittingText="Execute this proposal..."
          disabled={isSubmitting || dayjs().unix() < data?.eta}
        >
          Confirm Execute
        </Button>
      </form>
    </Modal>
  );
};

export default ProposalExecuteModal;
