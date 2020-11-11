export const utilizedStakeTip = (
  <div className="tooltip-text">
    <p>Utilized Stake</p>
    <p>
      This is the stake that is currently being used by someone. It cannot be
      withdrawn.
    </p>
  </div>
);

export const defaultedStakeTip = (
  <div className="tooltip-text">
    <p>Defaulted Stake</p>
    <p>
      This part shows the total amount of people which have not paid on time.
      Funds that are locked in defaulted stake are not earning UNION.
    </p>
  </div>
);

export const withdrawableStakeTip = (
  <div className="tooltip-text">
    <p>Withdrawable Stake</p>
    <p>
      This is the stake you can actually withdraw. It is{" "}
      <i>"Your total stake"</i> <strong>minus</strong>{" "}
      <i>"Your utilized stake"</i>
    </p>
  </div>
);

export const vouchingTip = (
  <div className="tooltip-text">
    <p>Vouching</p>
    <p>
      Vouching for someone is similar to cosigning, you are signalling to Union
      that they can be trusted to borrow and repay. Only Union members are able
      to vouch.
    </p>
  </div>
);

export const rewardsTip = (
  <div className="tooltip-text">
    <p>Rewards</p>
    <p>
      This is the total number of UNION Tokens you’ve accumulated so far since
      the last claim action.
    </p>
  </div>
);

export const rewardsMultiplierTip = (
  <div className="tooltip-text">
    <p>Rewards multiplier</p>
    <p>
      These are the rewards you accumulated based on your utilized stake and
      whether you are a member or not. For non-members the rewards multiplier is
      0.9x and for members it is 1 + the percent of your utilized stake. For
      example if you are a member and your total stake is 1000 DAI, your
      utilized stake is 700 and you don’t have any defaulted stake, then 1 +
      700/1000 means that your reward multiplier would be 1.75x
    </p>
  </div>
);

export const healthTip = (
  <div className="tooltip-text">
    <p>Health</p>
    <p>
      This is how much of <strong>your</strong> vouch the voucher is currently
      using
    </p>
  </div>
);

export const minimumPaymentDueTip = (
  <div className="tooltip-text">
    <p>Minimum Payment Due</p>
    <p>This is the amount you need to repay monthly</p>
  </div>
);

export const unionPerYearTip = (
  <div className="tooltip-text">
    <p>UNION Per Year</p>
    <p>
      This is the token that the staking contract returns to the user that is
      based on the DAI staked and reward multiplier algorithm. Each block
      inflates based on the total amount of DAI staked.
    </p>
    <p className="mt-4 mb-2 font-semibold text-type-base">
      Your share of the inflation is:
    </p>
    <p>
      <i>"Your not defaulted DAI stake"</i> <strong>times</strong>{" "}
      <i>"your reward multiplier"</i> <strong>divided by</strong>{" "}
      <i>"Sum of everyone elses above number"</i>
    </p>
  </div>
);

export const percentUtilizedTip = (
  <div className="tooltip-text">
    <p>Percent Utilized</p>
    <p>Calculated percentage usage of your available credit.</p>
  </div>
);

export const utilizedVouchTip = (
  <div className="tooltip-text">
    <p>Utilized</p>
    <p>
      This is how much of your voucher/backers vouch you are current using, if
      you default, this is how much of their funds will be locked.
    </p>
  </div>
);

export const feeTip = (
  <div className="tooltip-text">
    <p>Fee</p>
    <p>An origination fee is charged to cover the upfront risk of the loan.</p>
  </div>
);

export const quorumTip = (
  <div className="tooltip-text">
    <p>Votes Cast</p>
    <p>
      The percent of votes cast related to the total token supply. The{" "}
      <strong>percent quorum</strong> is the threshold of votes for the proposal
      to pass.
    </p>
  </div>
);
