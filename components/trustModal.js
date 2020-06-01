import { isAddress } from "@ethersproject/address";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { useTrustModalOpen, useTrustModalToggle } from "contexts/Stake";
import useAddressLabels from "hooks/useAddressLabels";
import useCurrentToken from "hooks/useCurrentToken";
import useIsMember from "hooks/useIsMember";
import useMemberContract from "hooks/useMemberContract";
import useToast, { FLAVORS } from "hooks/useToast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import handleTxError from "util/handleTxError";
import Button from "./button";
import Input from "./input";
import Modal, { ModalHeader } from "./modal";

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

  const { setLabel } = useAddressLabels();

  const onSubmit = async (data, e) => {
    let hidePendingToast;

    const { address, amount: rawAmount } = data;

    const amount = parseUnits(rawAmount, 18).toString();

    if (data.label) {
      setLabel(address, data.label);
    }

    try {
      let tx, estimate;

      if (isMember === true) {
        try {
          estimate = await memberContract.estimateGas.updateTrust(
            address,
            curToken,
            amount
          );
        } catch (error) {
          estimate = 300000;
        }
        tx = await memberContract.updateTrust(address, curToken, amount, {
          gasLimit: estimate,
        });
      } else {
        try {
          estimate = await memberContract.estimateGas.addTrust(
            address,
            curToken,
            amount
          );
        } catch (error) {
          estimate = 500000;
        }
        tx = await memberContract.addTrust(address, curToken, amount, {
          gasLimit: estimate,
        });
      }

      const { hide: hidePending } = addToast(
        FLAVORS.TX_PENDING(tx.hash, chainId)
      );

      hidePendingToast = hidePending;

      if (open) toggle();

      const receipt = await library.waitForTransaction(tx.hash);

      if (receipt.status === 1) {
        hidePending();

        addToast(FLAVORS.TX_SUCCESS(tx.hash, chainId));

        /**
         * @note Temp fix to update trust data after updating for now
         */
        mutate(["trust", account, curToken, library, chainId]);

        return;
      }

      hidePending();

      throw new Error(receipt.logs[0]);
    } catch (err) {
      hidePendingToast();

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
