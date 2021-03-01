import { useWeb3React } from "@web3-react/core";
import { useAutoCallback } from "hooks.macro";
import useMemberFee from "hooks/data/useMemberFee";
import useTokenBalance from "hooks/data/useTokenBalance";
import useUnionAllowance from "hooks/data/useUnionAllowance";
import useApplyMember from "hooks/payables/useApplyMember";
import useIncreaseUnionAllowance from "hooks/payables/useIncreaseUnionAllowance";
import useCurrentToken from "hooks/useCurrentToken";
import { useState } from "react";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import Button from "../../button";
import LabelPair from "../../labelPair";
import Modal, { ModalHeader } from "../../modal";
import { useSuccessModalToggle } from "../SuccessModal/state";
import { useApplicationModalOpen, useApplicationModalToggle } from "./state";

const ApplicationModal = () => {
  const { library } = useWeb3React();

  const UNION = useCurrentToken("UNION");

  const open = useApplicationModalOpen();
  const toggle = useApplicationModalToggle();

  const toggleSuccessModal = useSuccessModalToggle();

  const [isSubmitting, isSubmittingSet] = useState(false);

  const {
    data: unionAllowance = "0.00",
    mutate: updateUnionAllowance,
  } = useUnionAllowance();

  const { data: unionBalance = 0.0 } = useTokenBalance(UNION);

  const { data: fee = 0.0 } = useMemberFee();

  const applyMember = useApplyMember();

  const increaseUnionAllowance = useIncreaseUnionAllowance();

  const enableUNION = useAutoCallback(async () => {
    isSubmittingSet(true);
    try {
      await increaseUnionAllowance(fee);

      await updateUnionAllowance();

      isSubmittingSet(false);
    } catch (err) {
      isSubmittingSet(false);
    }
  });

  const submit = useAutoCallback(async () => {
    isSubmittingSet(true);

    try {
      const { hash } = await applyMember();

      if (open) toggle();

      await getReceipt(hash, library);

      isSubmittingSet(false);

      toggleSuccessModal();
    } catch (err) {
      isSubmittingSet(false);

      handleTxError(err);
    }
  });

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Become a member" onDismiss={toggle} />

      <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6">
        <p>
          You've collected all three vouches and are ready to become a member.{" "}
          {unionBalance <= "0.00" &&
            "You'll need to deposit DAI in order to earn UNION to become a member"}
        </p>

        <LabelPair
          className="mt-4"
          label="Wallet Balance"
          value={Number(unionBalance).toFixed(2)}
          valueType="UNION"
        />

        <LabelPair
          className="mt-8 mb-4"
          label="Membership Fee"
          value={fee.toFixed(2)}
          valueType="UNION"
        />

        <div className="divider"></div>

        <div className="mt-6">
          <Button
            full
            onClick={submit}
            submitting={isSubmitting}
            disabled={unionBalance < fee || isSubmitting}
          >
            {"Submit application"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ApplicationModal;
