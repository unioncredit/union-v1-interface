import { commify } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import Button from "components/button";
import Input from "components/input";
import Modal, { ModalHeader } from "components/modal";
import useDelegate from "hooks/governance/useDelegate";
import useVotingWalletData from "hooks/governance/useVotingWalletData";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import errorMessages from "util/errorMessages";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import validateAddress from "util/validateAddress";
import { useChooseDelegationModalToggle } from "../ChooseDelegationModal/state";
import {
  useDelegateVotingModalOpen,
  useDelegateVotingModalToggle,
} from "./state";

const DelegateVotingModal = ({ address }) => {
  const { account, library } = useWeb3React();

  const { data: votingWalletData } = useVotingWalletData(account);
  const { currentVotes = 0 } = !!votingWalletData && votingWalletData;

  const open = useDelegateVotingModalOpen();
  const toggle = useDelegateVotingModalToggle();

  const { register, handleSubmit, errors, formState } = useForm({
    defaultValues: { address: address ?? "" },
  });
  const { isSubmitting } = formState;

  const [knownScamAddress, knownScamAddressSet] = useState(false);

  useEffect(() => {
    knownScamAddressSet(false);
  }, [open]);

  const delegate = useDelegate();

  const onSubmit = async (values) => {
    try {
      const { hash } = await delegate(values.address);

      if (open) toggle();

      await getReceipt(hash, library);
    } catch (err) {
      handleTxError(err);
    }
  };

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Delegate Voting" onDismiss={toggle} />
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6"
      >
        <dl className="flex justify-between items-center mb-4">
          <dt>Your voting power</dt>
          <dd className="text-right">{`${commify(
            currentVotes.toFixed(4)
          )}`}</dd>
        </dl>

        <div className="divider" />

        {/* Spacer */}
        <div className="h-8" />

        <p>To which address would you like to delegate to?</p>

        {/* Spacer */}
        <div className="h-4" />

        <Input
          id="address"
          label="Address"
          name="address"
          placeholder="Enter the delegation address"
          error={errors.address}
          ref={register({
            required: errorMessages.required,
            validate: async (value) => {
              const validation = await validateAddress(value);

              if (validation === errorMessages.knownScam) {
                knownScamAddressSet(true);
              } else {
                knownScamAddressSet(false);
              }

              return validation;
            },
          })}
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

        <Button
          full
          type="submit"
          submitting={isSubmitting}
          submittingText="Confirming delegation..."
          disabled={knownScamAddress || isSubmitting}
        >
          Confirm delegation
        </Button>
      </form>
    </Modal>
  );
};

export default DelegateVotingModal;

export const ViewDelegateVoting = () => {
  const toggle = useDelegateVotingModalToggle();

  const chooseDelegationModalToggle = useChooseDelegationModalToggle();

  const { account } = useWeb3React();
  const { data: votingWalletData } = useVotingWalletData(account);

  const isDelegating = Boolean(votingWalletData?.delegates !== "Self");

  return (
    <button
      className="text-sm font-semibold underline rounded focus:outline-none focus:shadow-outline"
      onClick={isDelegating ? chooseDelegationModalToggle : toggle}
    >
      {isDelegating ? "Change" : "Delegate your votes"}
    </button>
  );
};
