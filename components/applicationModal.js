import { useWeb3React } from "@web3-react/core";
import { useAutoCallback } from "hooks.macro";
import useCurrentToken from "hooks/useCurrentToken";
import useMemberFee from "hooks/useMemberFee";
import useToast, { FLAVORS } from "hooks/useToast";
import useTokenBalance from "hooks/useTokenBalance";
import { applyMember } from "lib/contracts/applyMember";
import { useState } from "react";
import handleTxError from "util/handleTxError";
import Button from "./button";
import LabelPair from "./labelPair";
import Modal, { ModalHeader } from "./modal";

const ApplicationModal = ({ isOpen, onDismiss }) => {
  const { account, library, chainId } = useWeb3React();

  const DAI = useCurrentToken("DAI");
  const UNION = useCurrentToken("UNION");

  const [isSubmitting, isSubmittingSet] = useState(false);

  const { data: unionBalance = 0.0 } = useTokenBalance(UNION);
  const { data: fee = 0.0 } = useMemberFee();

  const addToast = useToast();

  const submit = useAutoCallback(async () => {
    isSubmittingSet(true);

    try {
      await applyMember(account, DAI, library.getSigner(), chainId);

      isSubmittingSet(false);
    } catch (err) {
      isSubmittingSet(false);

      const message = handleTxError(err);

      addToast(FLAVORS.TX_ERROR(message));
    }
  });

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <ModalHeader title="Become a member" onDismiss={onDismiss} />

      <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6">
        <p>
          You've collected all three vouches and are ready to become a member.
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
          value={fee}
          valueType="UNION"
        />

        <div className="divider"></div>

        <div className="mt-6">
          <Button
            full
            onClick={submit}
            submitting={isSubmitting}
            disabled={isSubmitting}
          >
            Submit application
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ApplicationModal;
