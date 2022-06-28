import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ModalOverlay, Text, Button, Box, ToggleMenu } from "@unioncredit/ui";

import isHash from "util/isHash";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import activityLabels from "util/activityLabels";
import useDelegate from "hooks/payables/useDelegate";
import { useAddActivity } from "hooks/data/useActivity";
import { useModal, useModalOpen } from "hooks/useModal";
import useVotingWalletData from "hooks/governance/useVotingWalletData";
import { Modal } from "components-ui";
import { AddressInput, generateHandleChange } from "components-ui/AddressInput";

export const VOTE_DELEGATION_MODAL = "vote-delegation-modal";

export const useVoteDelegationModal = () => useModal(VOTE_DELEGATION_MODAL);

export const useVoteDelegationModalOpen = () =>
  useModalOpen(VOTE_DELEGATION_MODAL);

const options = [
  { label: "To self", id: "self" },
  { label: "Third party", id: "delegate" },
];

export function VoteDelegationModal() {
  const [selected, setSelected] = useState("self");

  const delegate = useDelegate();
  const addActivity = useAddActivity();

  const { library, account } = useWeb3React();
  const { close } = useVoteDelegationModal();
  const { mutate: updateVotingWalletData } = useVotingWalletData(account);

  const { handleSubmit, register, clearErrors, setValue, setError, formState } =
    useForm({
      mode: "onChange",
      reValidateMode: "onChange",
    });

  useEffect(() => {
    register("address");
  }, []);

  const isOpen = useVoteDelegationModalOpen();

  if (!isOpen) return null;

  const { isSubmitting, errors } = formState;

  const handleDelegation = async (values) => {
    const delegateTo = selected === "self" ? account : values.address;
    try {
      const { hash } = await delegate(delegateTo);
      await getReceipt(hash, library);
      addActivity(activityLabels.delegate({ address: delegateTo, hash }));
      await updateVotingWalletData();
      close();
    } catch (err) {
      const hash = isHash(err.message) && err.message;
      handleTxError(err);
      addActivity(activityLabels.delegate({ address: delegateTo, hash }, true));
    }
  };

  const handleAddressInputChange = generateHandleChange({
    clearErrors,
    setValue,
    setError,
  });

  return (
    <ModalOverlay onClick={close}>
      <Modal title="Delegate votes" align="center" onClose={close}>
        <Text mb="16px">
          Vote as yourself or choose a trustworthy third party whom you’d like
          to vote on your behalf.
        </Text>
        <ToggleMenu
          fluid
          items={options}
          onChange={({ id }) => setSelected(id)}
        />
        <form onSubmit={handleSubmit(handleDelegation)}>
          <Box mt="18px" fluid />
          <AddressInput
            disabled={selected !== "delegate"}
            name="address"
            label="Wallet address"
            error={errors?.address?.message}
            placeholder="Ethereum address"
            onChange={handleAddressInputChange}
          />
          <Button
            fluid
            type="submit"
            loading={isSubmitting}
            label={
              selected === "delegate"
                ? "Delegate to third party"
                : "Vote as self"
            }
          />
        </form>
      </Modal>
    </ModalOverlay>
  );
}
