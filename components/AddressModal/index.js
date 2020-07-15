import { useWeb3React } from "@web3-react/core";
import { useAutoCallback } from "hooks.macro";
import useAddressLabels from "hooks/useAddressLabels";
import useCopy from "hooks/useCopy";
import useCurrentToken from "hooks/useCurrentToken";
import useENSName from "hooks/useENSName";
import useMemberContract from "hooks/contracts/useMemberContract";
import useToast, { FLAVORS } from "hooks/useToast";
import delay from "lib/delay";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import handleTxError from "util/handleTxError";
import truncateAddress from "util/truncateAddress";
import Address from "../address";
import AdjustTrustForm from "../adjustTrustForm";
import Button from "../button";
import HealthBar from "../healthBar";
import Identicon from "../identicon";
import Modal, { BackButton, CloseButton } from "../modal";
import { useAddressModalOpen, useAddressModalToggle } from "./state";

const InlineLabelEditor = ({ label, ENSName, address }) => {
  const { setLabel } = useAddressLabels();

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      label,
    },
  });

  const { isSubmitting, isDirty } = formState;

  const [copied, copy] = useCopy();

  const handleCopyAddress = () => copy(address);

  const onSubmit = async (data, e) => {
    await setLabel(address, data.label);

    await delay(1000);

    reset({ label: data.label });
  };

  return (
    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center">
        <input
          type="text"
          className="text-lg font-semibold text-center w-auto bg-transparent rounded-none focus:outline-none"
          name="label"
          autoCapitalize="off"
          placeholder="Add a label"
          autoCorrect="off"
          autoComplete="off"
          ref={register}
          id="label"
        />
      </div>
      {isDirty ? (
        <button
          type="submit"
          className="focus:outline-none leading-none font-medium text-type-light underline"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleCopyAddress}
          className="focus:outline-none leading-none font-medium text-type-light"
          title={address}
        >
          {copied ? "Copied!" : ENSName ?? truncateAddress(address, 6)}
        </button>
      )}
    </form>
  );
};

const ADDRESS_VIEWS = {
  HOME: "HOME",
  ADJUST: "ADJUST",
};

const AddressModal = ({ address, vouched, trust, used, health }) => {
  const { account, library, chainId } = useWeb3React();
  const curToken = useCurrentToken("DAI");

  const isOpen = useAddressModalOpen();
  const toggle = useAddressModalToggle();

  const [addressView, setAddressView] = useState(ADDRESS_VIEWS.HOME);

  useEffect(() => {
    if (isOpen) setAddressView(ADDRESS_VIEWS.HOME);
  }, [isOpen]);

  const ENSName = useENSName(address);

  const { getLabel } = useAddressLabels();

  const label = getLabel(address);

  const [removingAddress, removingAddressSet] = useState(false);

  const addToast = useToast();

  const memberManagerContract = useMemberContract();

  const removeAddress = useAutoCallback(async () => {
    let hidePendingToast = () => {};
    let txReceipt = {};

    try {
      removingAddressSet(true);
      let estimate;
      try {
        estimate = await memberManagerContract.estimateGas.cancelVouch(
          account,
          address,
          curToken
        );
      } catch (error) {
        estimate = 300000;
      }
      const tx = await memberManagerContract.cancelVouch(
        account,
        address,
        curToken,
        {
          gasLimit: estimate,
        }
      );

      const { hide: hidePending } = addToast(
        FLAVORS.TX_PENDING(tx.hash, chainId)
      );

      hidePendingToast = hidePending;

      const receipt = await library.waitForTransaction(tx.hash);

      if (receipt.status === 1) {
        hidePending();

        addToast(FLAVORS.TX_SUCCESS(tx.hash, chainId));

        removingAddressSet(false);

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

      removingAddressSet(false);
    }
  });

  const onComplete = async () => {
    toggle();

    /**
     * @note Temp fix to update trust data after updating for now
     */
    await mutate(["Trust", account, curToken, library]);
  };

  return (
    <Modal isOpen={isOpen} onDismiss={toggle}>
      <div className="p-4 sm:p-6 relative">
        {addressView === ADDRESS_VIEWS.HOME ? (
          <Fragment>
            <div className="absolute right-0 top-0 mr-6 mt-6">
              <CloseButton onClick={toggle} large />
            </div>

            <div className="flex justify-center mt-4">
              <Identicon address={address} extraLarge />
            </div>

            <div className="mt-4 text-center">
              <InlineLabelEditor
                address={address}
                ENSName={ENSName}
                label={label}
              />
            </div>

            <div className="mt-16">
              <dl className="flex justify-between py-2 items-center mb-2 leading-tight">
                <dt className="text-type-light">Trust</dt>
                <dd className="text-right">{`${trust} DAI`}</dd>
              </dl>
              <dl className="flex justify-between py-2 items-center mb-2 leading-tight">
                <dt className="text-type-light">Vouched</dt>
                <dd className="text-right">{`${vouched} DAI`}</dd>
              </dl>
              <dl className="flex justify-between py-2 items-center mb-2 leading-tight">
                <dt className="text-type-light">Used stake</dt>
                <dd className="text-right">{`${used} DAI`}</dd>
              </dl>
              <dl className="flex justify-between py-2 items-center mb-2 leading-tight">
                <dt className="text-type-light">Health</dt>
                <dd className="text-right">
                  <HealthBar health={health} />
                </dd>
              </dl>
            </div>

            <div className="mt-24">
              <Button full onClick={() => setAddressView(ADDRESS_VIEWS.ADJUST)}>
                Adjust Vouch
              </Button>
            </div>

            <div className="mt-4">
              <Button
                full
                invert
                onClick={removeAddress}
                disabled={removingAddress}
                submitting={removingAddress}
              >
                Remove Address
              </Button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="absolute left-0 top-0 ml-6 mt-6">
              <BackButton onClick={() => setAddressView(ADDRESS_VIEWS.HOME)} />
            </div>

            <div className="mt-12">
              <p>Edit this member's trust</p>
            </div>

            <div className="mt-4 cursor-text">
              <Address address={address} large copyable withLabel />
            </div>

            <div className="mt-4">
              <div className="divider" />
            </div>

            <div className="mt-4">
              <dl className="flex justify-between items-center leading-tight">
                <dt>Current Trust</dt>
                <dd className="text-right">{`${trust} DAI`}</dd>
              </dl>
            </div>

            <div className="mt-4">
              <div className="divider" />
            </div>

            <div className="mt-6">
              <AdjustTrustForm
                address={address}
                vouched={trust}
                onComplete={onComplete}
              />
            </div>
          </Fragment>
        )}
      </div>
    </Modal>
  );
};

export default AddressModal;
