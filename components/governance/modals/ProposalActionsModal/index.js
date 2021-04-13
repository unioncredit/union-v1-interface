import { useWeb3React } from "@web3-react/core";
import Button from "components/button";
import Input, { Select } from "components/input";
import Modal, { ModalHeader } from "components/modal";
import { TARGETS } from "constants/governance";
import { useForm } from "react-hook-form";
import errorMessages from "util/errorMessages";
import {
  useProposalActionsModalOpen,
  useProposalActionsModalToggle,
} from "./state";

const ProposalActionsModal = ({ addAction }) => {
  const { chainId } = useWeb3React();

  const open = useProposalActionsModalOpen();
  const toggle = useProposalActionsModalToggle();

  const { register, watch, errors, handleSubmit } = useForm();

  const targets = Object.keys(TARGETS[chainId]).map((key) => ({
    label: key,
    value: key,
  }));

  const getActions = (target) =>
    TARGETS[chainId][target].actions.map((action) => ({
      label: action.signature,
      value: action.signature,
    }));

  const getParams = (target, func) =>
    TARGETS[chainId][target].actions
      .filter((action) => action.signature === func)
      .pop();

  const inputs = watch();

  const onSubmit = async (data) => {
    const address = TARGETS[chainId][data.target].address;
    const calldata = Object.keys(data.calldata).map((key) => {
      const type = decodeURIComponent(key).split("_")[0];
      const isArray =
        type[type.length - 1] == "]" && type[type.length - 2] == "[";
      const value = isArray
        ? data.calldata[key].split(",")
        : data.calldata[key];
      return {
        type,
        value,
      };
    });

    const structuredResponse = {
      targets: [address],
      values: ["0"],
      signatures: [data.func],
      calldata: calldata,
    };

    await addAction((prev) => [...prev, structuredResponse]);

    toggle();
  };

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Add action" onDismiss={toggle} />

      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6"
      >
        <div className="space-y-4">
          <Select
            label="Select target"
            autoFocus
            options={targets}
            id="target"
            name="target"
            ref={register({ required: errorMessages.required })}
            error={errors?.target}
          />

          {inputs?.target && (
            <Select
              label="Select function"
              name="func"
              id="func"
              ref={register({ required: errorMessages.required })}
              options={getActions(inputs.target)}
              error={errors?.func}
            />
          )}

          {inputs?.func &&
            inputs?.target &&
            getParams(inputs.target, inputs.func)?.params.map((param, i) => {
              return (
                <Input
                  key={i}
                  name={encodeURIComponent(`calldata.${param}_${i}`)}
                  label="Enter new value"
                  ref={register({ required: errorMessages.required })}
                  placeholder={param}
                  error={errors?.calldata?.[`${param}_${i}`]}
                />
              );
            })}
        </div>

        {/* Spacer */}
        <div className="h-12" />

        <Button type="submit" full>
          Add action
        </Button>
      </form>
    </Modal>
  );
};

export default ProposalActionsModal;
