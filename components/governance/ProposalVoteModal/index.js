import { commify } from "@ethersproject/units";
import classNames from "classnames";
import Button from "components/button";
import Modal, { ModalHeader } from "components/modal";
import useProposalData from "hooks/governance/useProposalData";
import useUserVotes from "hooks/governance/useUserVotes";
import { forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toPercent } from "util/numbers";
import VoteBar from "../VoteBar";
import { useProposalVoteModalOpen, useProposalVoteModalToggle } from "./state";

const VoteRadioButton = forwardRef(
  /**
   * @param {object} props
   * @param {number} props.votes
   * @param {number} props.totalVotes
   * @param {boolean} props.isSelected
   * @param {("For"|"Against")} props.type
   */
  ({ votes, totalVotes, isSelected, type = "For", ...props }, ref) => {
    const percent = votes / totalVotes;

    const cachedClassNames = classNames(
      "p-4 rounded border flex items-center divide-x focus-within:shadow-outline select-none transition-colors duration-150",
      isSelected ? "bg-pink-light border-pink-pure" : "bg-white"
    );

    return (
      <label className={cachedClassNames}>
        <div className="pr-4">
          <input
            id="vote"
            name="vote"
            ref={ref}
            type="radio"
            value={type}
            className="focus:outline-none"
            {...props}
          />
        </div>
        <div className="pl-4 w-full">
          <div className="flex justify-between">
            <p className="font-semibold text-lg leading-tight">{type}</p>
            <p className="font-semibold text-lg leading-tight">
              ({toPercent(percent)}) {commify(votes.toFixed(2))}
            </p>
          </div>

          {/* Spacer */}
          <div className="h-2" />

          <VoteBar percent={percent} type={type} />
        </div>
      </label>
    );
  }
);

const ProposalVoteModal = ({ id }) => {
  /**
   * @todo Hook up to web3
   */
  const address = "0x54a37d93e57c5da659f508069cf65a381b61e189";

  const open = useProposalVoteModalOpen();
  const toggle = useProposalVoteModalToggle();

  const data = useProposalData(id);

  /**
   * Vote Handling
   */
  const { register, handleSubmit, reset, watch, formState } = useForm();
  const { isDirty, isSubmitting } = formState;

  useEffect(() => {
    reset();
  }, [open]);

  /**
   * @param {object} values
   * @param {("For"|"Against")} values.vote
   */
  const onSubmit = async () => {};

  /**
   * @type {("For"|"Against")}
   */
  const voteSelection = watch("vote");

  /**
   * Vote Maths
   */
  const { data: userVotes = 0 } = useUserVotes(address);

  const forVotes =
    isDirty && voteSelection === "For"
      ? (data?.forCount || 0) + userVotes
      : data?.forCount || 0;

  const againstVotes =
    isDirty && voteSelection === "Against"
      ? (data?.againstCount || 0) + userVotes
      : data?.againstCount || 0;

  const totalVotes = forVotes + againstVotes;

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Vote" onDismiss={toggle} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6"
      >
        <p className="text-xl font-semibold">{data?.title}</p>

        {/* Spacer */}
        <div className="h-8" />

        <p>How would you like to vote?</p>

        {/* Spacer */}
        <div className="h-6" />

        <VoteRadioButton
          votes={forVotes}
          totalVotes={totalVotes}
          type="For"
          isSelected={voteSelection === "For"}
          ref={register({ required: true })}
        />

        {/* Spacer */}
        <div className="h-4" />

        <VoteRadioButton
          votes={againstVotes}
          totalVotes={totalVotes}
          type="Against"
          isSelected={voteSelection === "Against"}
          ref={register({ required: true })}
        />

        {/* Spacer */}
        <div className="h-8" />

        <p className="text-center leading-tight text-type-light">
          {isDirty ? "After you vote" : "Current outcome"}
        </p>

        {/* Spacer */}
        <div className="h-12" />

        <Button
          full
          type="submit"
          submitting={isSubmitting}
          submittingText="Casting your vote..."
          disabled={isSubmitting || !isDirty}
        >
          Confirm vote
        </Button>
      </form>
    </Modal>
  );
};

export default ProposalVoteModal;
