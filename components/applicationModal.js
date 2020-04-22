import useCurrentToken from "@hooks/useCurrentToken";
import { verifyMembership } from "@lib/contracts/verifyMembership";
import { useWeb3React } from "@web3-react/core";
import { useAutoCallback } from "hooks.macro";
import Button from "./button";
import Modal, { CloseButton, ModalHeader } from "./modal";

const ApplicationModal = ({ isOpen, onDismiss }) => {
  const { account, library, chainId } = useWeb3React();

  const curToken = useCurrentToken();

  const submit = useAutoCallback(async () => {
    try {
      await verifyMembership(account, curToken, library.getSigner(), chainId);
    } catch (err) {}
  });

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <ModalHeader title="Become a member" onDismiss={onDismiss} />

      <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6">
        <p className="text-center">
          You've collected all three vouches and are ready to become a member.
        </p>

        <div className="mt-6">
          <Button full onClick={submit}>
            Submit application
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ApplicationModal;
