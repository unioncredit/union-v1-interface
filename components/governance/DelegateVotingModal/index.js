import { commify } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import Button from "components/button";
import Input from "components/input";
import Modal, { ModalHeader } from "components/modal";
import useUserVotes from "hooks/governance/useUserVotes";
import {
  useDelegateVotingModalOpen,
  useDelegateVotingModalToggle,
} from "./state";

const DelegateVotingModal = ({ address }) => {
  const { account } = useWeb3React();

  const { data: currentVotes = 0 } = useUserVotes(account);

  const open = useDelegateVotingModalOpen();
  const toggle = useDelegateVotingModalToggle();

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Delegate Voting" onDismiss={toggle} />
      <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6">
        <dl className="flex justify-between items-center mb-4">
          <dt>Your voting power</dt>
          <dd className="text-right">{`${commify(
            currentVotes.toFixed(2)
          )}`}</dd>
        </dl>

        <div className="divider" />

        {/* Spacer */}
        <div className="h-8" />

        <p>To which address would you like to delegate to?</p>

        {/* Spacer */}
        <div className="h-4" />

        <Input
          label="Address"
          id="address"
          name="address"
          placeholder="Enter the delegation address"
          defaultValue={address ?? ""}
        />

        {/* Spacer */}
        <div className="h-6" />

        <div className="p-4 rounded bg-pink-light border border-pink-pure">
          <p
            className="font-sm leading-tight crop-tight"
            style={{ color: "#AC786D" }}
          >
            You are not transferring tokens, you are only delegating your voting
            rights. You will be able to undo this at any time from the voting
            wallet.
          </p>
        </div>

        {/* Spacer */}
        <div className="h-6" />

        <Button full disabled>
          Confirm delegation
        </Button>
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
