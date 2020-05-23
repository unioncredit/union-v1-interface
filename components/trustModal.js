import { isAddress } from "@ethersproject/address";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { useTrustModalOpen, useTrustModalToggle } from "contexts/Stake";
import useCurrentToken from "hooks/useCurrentToken";
import useIsMember from "hooks/useIsMember";
import useMemberContract from "hooks/useMemberContract";
import useToast, { FLAVORS } from "hooks/useToast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import handleTxError from "util/handleTxError";
import Button from "./button";
import Input from "./input";
import Modal, { ModalHeader } from "./modal";
import { mutate } from "swr";

const TrustModal = ({ initialAddress, initialTrust }) => {
  const { chainId, account, library } = useWeb3React();

  const open = useTrustModalOpen();
  const toggle = useTrustModalToggle();

  const { handleSubmit, register, formState, errors, reset } = useForm();

  useEffect(() => reset(), [open]);

  const { dirty, isSubmitting } = formState;

  const curToken = useCurrentToken();

  const addToast = useToast();

  const isMember = useIsMember();

  const memberContract = useMemberContract();

  const onSubmit = async (data, e) => {
    const { address, amount: rawAmount } = data;

    const amount = parseUnits(rawAmount, 18).toString();

    try {
      let tx;

      if (isMember === true) {
        tx = await memberContract.updateTrust(address, curToken, amount, {
          gasLimit: 200000,
        });
      } else {
        tx = await memberContract.addTrust(address, curToken, amount, {
          gasLimit: 500000,
        });
      }

      const { hide: hidePending } = addToast(
        FLAVORS.TX_PENDING(tx.hash, chainId)
      );

      if (open) toggle();

      await tx.wait();

      hidePending();

      addToast(FLAVORS.TX_SUCCESS(tx.hash, chainId));

      /**
       * @note Temp fix to update trust data after updating for now
       */
      mutate(["trust", account, curToken, library, chainId]);
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
          id="amount"
          label="Trust amount"
          name="amount"
          placeholder="0.00"
          step={0.01}
          tip="The amount you trust this address to borrow and be able to repay."
          type="number"
          error={errors.amount}
          ref={register({
            required: "Please fill out this field",
            min: {
              value: 1.0,
              message: "Value must be greater than or equal to 1.00",
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
