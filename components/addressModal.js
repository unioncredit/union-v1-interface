import { useWeb3React } from "@web3-react/core";
import { useAddressModalOpen, useAddressModalToggle } from "contexts/Stake";
import { useAutoCallback } from "hooks.macro";
import useCopy from "hooks/useCopy";
import useCurrentToken from "hooks/useCurrentToken";
import useENSName from "hooks/useENSName";
import useMemberContract from "hooks/useMemberContract";
import useToast, { FLAVORS } from "hooks/useToast";
import { Fragment, useEffect, useState } from "react";
import { mutate } from "swr";
import handleTxError from "util/handleTxError";
import truncateAddress from "util/truncateAddress";
import Address from "./address";
import AdjustTrustForm from "./adjustTrustForm";
import Button from "./button";
import HealthBar from "./healthBar";
import Identicon from "./identicon";
import Modal, { BackButton, CloseButton } from "./modal";

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

  const [copied, copy] = useCopy();

  const handleCopyAddress = () => copy(address);

  const [removingAddress, removingAddressSet] = useState(false);

  const addToast = useToast();

  const memberManagerContract = useMemberContract();

  const removeAddress = useAutoCallback(async () => {
    try {
      removingAddressSet(true);

      const tx = await memberManagerContract.cancelVouch(
        account,
        address,
        curToken,
        {
          gasLimit: 200000,
        }
      );

      const { hide: hidePending } = addToast(
        FLAVORS.TX_PENDING(tx.hash, chainId)
      );

      if (open) toggle();

      await tx.wait();

      hidePending();

      addToast(FLAVORS.TX_SUCCESS(tx.hash, chainId));

      removingAddressSet(false);

      /**
       * @note Temp fix to update trust data after updating for now
       */
      mutate(["trust", account, curToken, library, chainId]);
    } catch (err) {
      const message = handleTxError(err);

      addToast(FLAVORS.TX_ERROR(message));

      removingAddressSet(false);
    }
  });

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
              <button
                onClick={handleCopyAddress}
                className="focus:outline-none text-lg font-semibold"
                title={address}
              >
                {copied ? "Copied!" : ENSName ?? truncateAddress(address)}
              </button>
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
              <Address address={address} large copyable />
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
                onComplete={toggle}
              />
            </div>
          </Fragment>
        )}
      </div>
    </Modal>
  );
};

export default AddressModal;
