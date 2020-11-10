import { useWeb3React } from "@web3-react/core";
import { useGetInvitedModalToggle } from "components/modals/GetInvitedModal/state";
import useAdjustTrust from "hooks/payables/useAdjustTrust";
import useAddressLabels from "hooks/useAddressLabels";
import useIsMember from "hooks/useIsMember";
import useTrustData from "hooks/useTrustData";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import errorMessages from "util/errorMessages";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import validateAddress from "util/validateAddress";
import Button from "../../button";
import Input from "../../input";
import Modal, { ModalHeader } from "../../modal";
import { useTrustModalOpen, useTrustModalToggle } from "./state";

const TrustModal = ({ initialAddress, initialTrust }) => {
  const { library } = useWeb3React();

  const open = useTrustModalOpen();
  const toggle = useTrustModalToggle();

  const toggleGetInvitedModal = useGetInvitedModalToggle();

  const { handleSubmit, register, formState, errors, reset } = useForm();

  const { isDirty, isSubmitting } = formState;

  const [knownScamAddress, knownScamAddressSet] = useState(false);

  useEffect(() => {
    reset();
    knownScamAddressSet(false);
  }, [open]);

  const { data: isMember = null } = useIsMember();

  const { mutate: updateTrustData } = useTrustData();

  const adjustTrust = useAdjustTrust();

  const { setLabel } = useAddressLabels();

  const onSubmit = async (data) => {
    const { address, amount } = data;

    if (data.label) {
      await setLabel(address, data.label);
    }

    try {
      const { hash } = await adjustTrust(address, amount);

      if (open) toggle();

      await getReceipt(hash, library);

      await updateTrustData();
    } catch (err) {
      handleTxError(err);
    }
  };

  const handleLearnMore = () => {
    toggle();
    toggleGetInvitedModal();
  };

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Vouch for a member" onDismiss={toggle} />

      <div className="px-4 py-6 sm:px-6 sm:py-8">
        {isMember !== null && isMember === false && (
          <p className="mb-8 -mt-1">
            <strong>Note</strong>: You are not yet a Union member, you cannot
            yet vouch for another address.{" "}
            <button onClick={handleLearnMore} className="underline font-medium">
              Learn more
            </button>
          </p>
        )}

        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
          <Input
            autoFocus={!initialAddress}
            className="mb-4"
            defaultValue={initialAddress}
            id="address"
            label="Address"
            name="address"
            placeholder="Enter address"
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

          <Input
            className="mb-4"
            id="label"
            label="Label (Optional)"
            name="label"
            placeholder="Label this address"
            error={errors.label}
            tip="Labels are always stored locally on your device"
            ref={register}
          />

          <Input
            autoFocus={!!initialAddress}
            chip="DAI"
            className="mb-4"
            defaultValue={initialTrust > 0 ? initialTrust : undefined}
            id="amount"
            label="Trust amount"
            name="amount"
            placeholder="0.00"
            step={0.01}
            tip="The amount you trust this address to borrow and be able to repay."
            type="number"
            error={errors.amount}
            ref={register({
              required: errorMessages.required,
              min: {
                value: 1.0,
                message: errorMessages.minValueOnePointZero,
              },
            })}
          />

          <div className="mt-6">
            <Button
              full
              type="submit"
              disabled={
                knownScamAddress ||
                isMember === false ||
                isSubmitting ||
                !isDirty
              }
              submitting={isSubmitting}
            >
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TrustModal;
