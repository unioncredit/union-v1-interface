import { isAddress } from "@ethersproject/address";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { useGetInvitedModalToggle } from "components/GetInvitedModal/state";
import use3BoxLabels from "hooks/3box/use3BoxLabels";
import useCurrentToken from "hooks/useCurrentToken";
import useIsMember from "hooks/useIsMember";
import useMemberContract from "hooks/useMemberContract";
import useToast, { FLAVORS } from "hooks/useToast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import handleTxError from "util/handleTxError";
import Button from "../button";
import Input from "../input";
import Modal, { ModalHeader } from "../modal";
import { useTrustModalOpen, useTrustModalToggle } from "./state";

const TrustModal = ({ initialAddress, initialTrust }) => {
  const { chainId, account, library } = useWeb3React();

  const open = useTrustModalOpen();
  const toggle = useTrustModalToggle();

  const toggleGetInvitedModal = useGetInvitedModalToggle();

  const { handleSubmit, register, formState, errors, reset } = useForm();

  useEffect(() => reset(), [open]);

  const { isDirty, isSubmitting } = formState;

  const curToken = useCurrentToken();

  const addToast = useToast();

  const { data: isMember = null } = useIsMember();

  const memberContract = useMemberContract();

  const { setLabel } = use3BoxLabels();

  const onSubmit = async (data, e) => {
    let hidePendingToast = () => {};
    let txReceipt = {};

    const { address, amount: rawAmount } = data;

    const amount = parseUnits(rawAmount, 18).toString();

    if (data.label) {
      await setLabel(address, data.label);
    }

    try {
      let gasLimit;

      try {
        gasLimit = await memberContract.estimateGas.updateTrust(
          address,
          curToken,
          amount
        );
      } catch (error) {
        gasLimit = 300000;
      }

      const tx = await memberContract.updateTrust(address, curToken, amount, {
        gasLimit,
      });

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
        await mutate(["Trust", account, curToken, library]);

        return;
      }

      hidePending();

      txReceipt = receipt;

      throw new Error(receipt.logs[0]);
    } catch (err) {
      hidePendingToast();

      const message = handleTxError(err);

      addToast(FLAVORS.TX_ERROR(message, txReceipt?.transactionHash, chainId));
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
              required: "Please fill out this field",
              validate: (value) =>
                isAddress(value)
                  ? true
                  : "Please input a valid Ethereum address",
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
              disabled={isMember === false || isSubmitting || !isDirty}
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
