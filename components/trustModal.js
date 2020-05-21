import { isAddress } from "@ethersproject/address";
import { useTrustModalOpen, useTrustModalToggle } from "contexts/Stake";
import useCurrentToken from "hooks/useCurrentToken";
import useToast, { FLAVORS } from "hooks/useToast";
import { vouch } from "lib/contracts/vouch";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import handleTxError from "util/handleTxError";
import Button from "./button";
import Input from "./input";
import Modal, { ModalHeader } from "./modal";

const TrustModal = ({ initialAddress, initialTrust }) => {
  const open = useTrustModalOpen();
  const toggle = useTrustModalToggle();

  const { handleSubmit, register, formState, errors, reset } = useForm();

  useEffect(() => reset(), [open]);

  const { dirty, isSubmitting } = formState;

  const curToken = useCurrentToken();

  const addToast = useToast();

  const onSubmit = async (values) => {
    try {
      const tx = await vouch(
        values.address,
        curToken,
        values.amount,
        library.getSigner(),
        chainId
      );

      const { hide: hidePending } = addToast(
        FLAVORS.TX_PENDING(tx.hash, chainId)
      );

      if (open) toggle();

      await tx.wait();

      hidePending();

      addToast(FLAVORS.TX_SUCCESS(tx.hash, chainId));
    } catch (err) {
      const message = handleTxError(err);

      addToast(FLAVORS.TX_ERROR(message));
    }
  };

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Vouch for a member" onDismiss={toggle} />

      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 py-6 sm:px-6 sm:py-8"
      >
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
            required: "Please fill out this field",
            validate: (value) =>
              isAddress(value) ? true : "Please input a valid Ethereum address",
          })}
        />

        <Input
          autoFocus={!!initialAddress}
          chip="DAI"
          className="mb-4"
          defaultValue={initialTrust > 0 ? initialTrust : undefined}
          id="trust"
          label="Trust amount"
          name="trust"
          placeholder="0.00"
          step={0.01}
          tip="The amount you trust this address to borrow and be able to repay."
          type="number"
          error={errors.amount}
          ref={register({
            required: "Please fill out this field",
            min: {
              value: 0,
              message: "Value must be greater than 0",
            },
          })}
        />

        <div className="mt-20">
          <Button
            full
            type="submit"
            disabled={isSubmitting || !dirty}
            submitting={isSubmitting}
          >
            Confirm
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TrustModal;
