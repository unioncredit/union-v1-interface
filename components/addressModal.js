import { useAddressModalOpen, useAddressModalToggle } from "@contexts/Stake";
import useENSName from "@hooks/useENSName";
import delay from "@lib/delay";
import truncateAddress from "@util/truncateAddress";
import { cancelVouch } from "@lib/contracts/cancelVouch";
import useCurrentToken from "@hooks/useCurrentToken";
import { useAutoCallback } from "hooks.macro";
import { useWeb3React } from "@web3-react/core";
import { Fragment, useEffect, useState } from "react";
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

const AddressModal = ({ address, vouched, used, health }) => {
  const { account, library, chainId } = useWeb3React();
  const curToken = useCurrentToken("DAI");

  const isOpen = useAddressModalOpen();
  const toggle = useAddressModalToggle();

  const [addressView, setAddressView] = useState(ADDRESS_VIEWS.HOME);

  useEffect(() => {
    if (isOpen) setAddressView(ADDRESS_VIEWS.HOME);
  }, [isOpen]);

  const ENSName = useENSName(address);

  const [removingAddress, removingAddressSet] = useState(false);

  const removeAddress = useAutoCallback(async () => {
    try {
      removingAddressSet(true);

      /**
       * Simulate tx to remove address
       */
      //await delay();
      await cancelVouch(account, address, curToken, library.getSigner(), chainId);
      removingAddressSet(false);
    } catch (err) {
      console.error(err);
      removingAddressSet(false);
    }
  });

  return (
    <Modal isOpen={isOpen} onDismiss={toggle}>
      <div className="px-4 sm:px-6 pb-6 pt-4 relative">
        {addressView === ADDRESS_VIEWS.HOME ? (
          <Fragment>
            <div className="absolute right-0 top-0 mr-6 mt-6">
              <CloseButton onClick={toggle} large />
            </div>

            <div className="flex justify-center mt-10">
              <Identicon address={address} extraLarge />
            </div>

            <div className="mt-4">
              <p className="text-center text-lg font-semibold" title={address}>
                {ENSName ?? truncateAddress(address)}
              </p>
            </div>

            <div className="mt-16">
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
              <div className="mt-20">
                <p>Edit this member's trust</p>
              </div>

              <div className="mt-4 cursor-text">
                <Address address={address} large />
              </div>

              <div className="mt-4">
                <div className="divider" />
              </div>

              <div className="mt-4">
                <dl className="flex justify-between items-center leading-tight">
                  <dt>Current Trust</dt>
                  <dd className="text-right">{`${vouched} DAI`}</dd>
                </dl>
              </div>

              <div className="mt-4">
                <div className="divider" />
              </div>

              <div className="mt-6">
                <AdjustTrustForm
                  address={address}
                  vouched={vouched}
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
