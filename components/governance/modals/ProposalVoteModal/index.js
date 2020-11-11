import { commify } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import Button from "components/button";
import Modal, { ModalHeader } from "components/modal";
import Skeleton from "components/Skeleton";
import useCastVote from "hooks/payables/useCastVote";
import useProposalData from "hooks/governance/useProposalData";
import useVotingWalletData from "hooks/governance/useVotingWalletData";
import { forwardRef, Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import { toPercent } from "util/numbers";
import VoteBar from "../../VoteBar";
import { useProposalVoteModalOpen, useProposalVoteModalToggle } from "./state";
import useAllProposalData from "hooks/governance/useAllProposalData";

const VoteRadioButton = forwardRef(
  /**
   * @param {object} props
   * @param {number} props.votes
   * @param {number} props.totalVotes
   * @param {boolean} props.isSelected
   * @param {("For"|"Against")} props.type
   */
  ({ votes, totalVotes, isSelected, type = "For", ...props }, ref) => {
    const percent = votes / totalVotes ? votes / totalVotes : 0;

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
          <div className="flex justify-between font-semibold text-lg leading-tight">
            <div>{type}</div>
            <div>
              {typeof votes === "number" ? (
                `(${toPercent(percent)}) ${commify(votes.toFixed(2))}`
              ) : (
                <Fragment>
                  <Skeleton width={60} /> <Skeleton width={90} />
                </Fragment>
              )}
            </div>
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
  const { library, account } = useWeb3React();

  const open = useProposalVoteModalOpen();
  const toggle = useProposalVoteModalToggle();

  const { mutate: updateProposalData } = useAllProposalData();

  const data = useProposalData(id);

  /**
   * Vote Handling
   */
  const { register, handleSubmit, reset, watch, formState } = useForm();
  const { isDirty, isSubmitting } = formState;

  useEffect(() => {
    reset();
  }, [open]);

  const castVote = useCastVote();

  /**
   * @param {object} values
   * @param {("For"|"Against")} values.vote
   */
  const onSubmit = async (values) => {
    try {
      const support = values.vote === "For" ? true : false;

      const { hash } = await castVote(id, support);

      if (open) toggle();

      await getReceipt(hash, library);

      await updateProposalData();
    } catch (err) {
      handleTxError(err);
    }
  };

  /**
   * @type {("For"|"Against")}
   */
  const vote = watch("vote");

  /**
   * Vote Maths
   */
  const { data: votingWalletData } = useVotingWalletData(account);
  const { currentVotes = 0 } = !!votingWalletData && votingWalletData;

  const forVotes =
    isDirty && vote === "For"
      ? (data?.forCount || 0) + currentVotes
      : data?.forCount || 0;

  const againstVotes =
    isDirty && vote === "Against"
      ? (data?.againstCount || 0) + currentVotes
      : data?.againstCount || 0;

  const totalVotes = forVotes + againstVotes;

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Vote" onDismiss={toggle} />
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6"
      >
        <p className="text-xl font-semibold">{data?.title ?? <Skeleton />}</p>

        {/* Spacer */}
        <div className="h-8" />

        <p>How would you like to vote?</p>

        {/* Spacer */}
        <div className="h-6" />

        <VoteRadioButton
          votes={forVotes}
          totalVotes={totalVotes}
          type="For"
          disabled={!data}
          isSelected={vote === "For"}
          ref={register({ required: true })}
        />

        {/* Spacer */}
        <div className="h-4" />

        <VoteRadioButton
          votes={againstVotes}
          totalVotes={totalVotes}
          type="Against"
          disabled={!data}
          isSelected={vote === "Against"}
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
