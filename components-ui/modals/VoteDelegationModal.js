import {
  ModalOverlay,
  Divider,
  ControlGroup,
  Text,
  Button,
  Input,
  Box,
} from "union-ui";
import { useState } from "react";
import { Modal } from "components-ui";
import { useModal } from "hooks/useModal";
import validateAddress from "util/validateAddress";
import { useForm } from "react-hook-form";
import handleTxError from "util/handleTxError";
import { useWeb3React } from "@web3-react/core";
import useDelegate from "hooks/payables/useDelegate";
import { useAddActivity } from "hooks/data/useActivity";
import activityLabels from "util/activityLabels";
import getReceipt from "util/getReceipt";
import isHash from "util/isHash";

export const VOTE_DELEGATION_MODAL = "vote-delegation-modal";

export const useVoteDelegationModal = () => useModal(VOTE_DELEGATION_MODAL);

const radioOptions = [
  { type: "radio", label: "Vote as self", id: "self" },
  { type: "radio", label: "Delegate votes to another account", id: "delegate" },
];

export function VoteDelegationModal() {
  const addActivity = useAddActivity();
  const { library, account } = useWeb3React();
  const [selected, setSelected] = useState(null);
  const { close } = useVoteDelegationModal();
  const delegate = useDelegate();

  const { handleSubmit, register, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleDelegation = async (values) => {
    const delegateTo = values?.address || account;
    try {
      const { hash } = await delegate(delegateTo);
      await getReceipt(hash, library);
      addActivity(activityLabels.delegate({ address: delegateTo, hash }));
      close();
    } catch (err) {
      const hash = isHash(err.message) && err.message;
      handleTxError(err);
      addActivity(activityLabels.delegate({ address: delegateTo, hash }, true));
    }
  };

  const validate = (address) => {
    return validateAddress(address);
  };

  return (
    <ModalOverlay>
      <Modal title="Voting wallet setup" onClose={close}>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleDelegation)}>
            <Text size="large" mb="14px">
              Voting method
            </Text>
            <ControlGroup items={radioOptions} onChange={setSelected} />
            {selected === "delegate" && (
              <Box mt="2px">
                <Input
                  ref={register({ validate })}
                  name="address"
                  error={errors?.address?.message}
                  placeholder="Ethereum address"
                />
              </Box>
            )}
            <Divider />
            <Button
              fluid
              mt="20px"
              type="submit"
              label="Submit voting preferences"
            />
          </form>
        </Modal.Body>
      </Modal>
    </ModalOverlay>
  );
}
