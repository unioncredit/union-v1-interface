import { useWeb3React } from "@web3-react/core";
import LabelPair from "components/labelPair";
import ProfileImage from "components/ProfileImage";
import { useAutoCallback } from "hooks.macro";
import useRemoveVouch from "hooks/payables/useRemoveVouch";
import use3BoxPublicData from "hooks/use3BoxPublicData";
import useAddressLabels from "hooks/useAddressLabels";
import useCopy from "hooks/useCopy";
import useCurrentToken from "hooks/useCurrentToken";
import useENSName from "hooks/useENSName";
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

const ADDRESS_VIEWS = {
  HOME: "HOME",
  ADJUST: "ADJUST",
};

const AddressModal = ({ address, vouched, trust, used, health }) => {
  const { account, library } = useWeb3React();
  const curToken = useCurrentToken("DAI");

  const isOpen = useAddressModalOpen();
  const toggle = useAddressModalToggle();

  const [addressView, setAddressView] = useState(ADDRESS_VIEWS.HOME);

  const ENSName = useENSName(address);

  const { getLabel, setLabel } = useAddressLabels();
  const label = getLabel(address);

  const { data, error } = use3BoxPublicData(address);
  const has3BoxProfileImage = !!data && !error && data?.image;

  const [isCopied, copy] = useCopy();
  const handleCopy = () => copy(address);

  const [enableForm, enableFormSet] = useState(false);
  const toggleForm = () => enableFormSet(!enableForm);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: { label: label ?? data?.name },
  });

  const { isSubmitting } = formState;

  useEffect(() => {
    if (isOpen) {
      setAddressView(ADDRESS_VIEWS.HOME);
      reset({ label: label ?? data?.name });
      enableFormSet(false);
    }
  }, [isOpen]);

  const onSubmit = async (data) => {
    await setLabel(address, data.label);

    await delay(500);

    reset({ label: data.label });

    enableFormSet(false);
  };

  const [removingAddress, removingAddressSet] = useState(false);

  const removeVouch = useRemoveVouch();

  const addToast = useToast();

  const removeAddress = useAutoCallback(async () => {
    let hidePendingToast = () => {};
    let txReceipt = {};

    try {
      removingAddressSet(true);

      const tx = await removeVouch(address);

      const { hide: hidePending } = addToast(FLAVORS.TX_PENDING(tx.hash));

      hidePendingToast = hidePending;

      const receipt = await library.waitForTransaction(tx.hash);

      if (receipt.status === 1) {
        hidePending();

        addToast(FLAVORS.TX_SUCCESS(tx.hash));

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

      addToast(FLAVORS.TX_ERROR(message, txReceipt?.transactionHash));

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

            <div className="flex items-center mt-4">
              {has3BoxProfileImage ? (
                <ProfileImage
                  alt={label ?? data?.name ?? ENSName ?? address}
                  image={data.image}
                  size={72}
                />
              ) : (
                <Identicon address={address} extraLarge />
              )}

              {enableForm ? (
                <form
                  className="ml-4"
                  method="POST"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    type="text"
                    className="text-xl font-semibold leading-tight block bg-transparent rounded-none focus:outline-none text-type-base placeholder-type-lightest"
                    name="label"
                    autoCapitalize="off"
                    placeholder="Add a label"
                    autoCorrect="off"
                    autoComplete="off"
                    ref={register}
                    id="label"
                  />
                  <div className="flex space-x-2">
                    <button
                      className="text-sm font-medium underline focus:outline-none"
                      onClick={toggleForm}
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      className="text-sm font-medium underline focus:outline-none"
                      type="submit"
                    >
                      {isSubmitting ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="ml-4">
                  <p
                    className="text-xl font-semibold leading-tight"
                    title={address}
                  >
                    {label ?? data?.name ?? ENSName ?? truncateAddress(address)}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      className="text-sm font-medium underline focus:outline-none"
                      type="button"
                      onClick={toggleForm}
                    >
                      Rename
                    </button>
                    <button
                      className="text-sm font-medium underline focus:outline-none"
                      onClick={handleCopy}
                      type="button"
                    >
                      {isCopied ? "Copied" : "Copy Address"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-16">
              <LabelPair
                labelColor="text-grey-pure"
                label="Trust"
                value={trust}
                valueType="DAI"
              />
              <LabelPair
                labelColor="text-grey-pure"
                label="Vouched"
                value={vouched}
                valueType="DAI"
              />
              <LabelPair
                labelColor="text-grey-pure"
                label="Used stake"
                value={used}
                valueType="DAI"
              />
              <LabelPair
                labelColor="text-grey-pure"
                label="Health"
                valueSlot={<HealthBar health={health} />}
              />
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
            <div className="flex mb-4">
              <BackButton onClick={() => setAddressView(ADDRESS_VIEWS.HOME)} />
            </div>

            <p>Edit this member's trust</p>

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
