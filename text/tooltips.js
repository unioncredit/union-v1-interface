import { Fragment } from "react";

export const utilizedStakeTip = (
  <Fragment>
    <p>Utilized Stake</p>
    <p>
      This is the stake that is currently being used by someone. It cannot be
      withdrawn.
    </p>
  </Fragment>
);

export const defaultedStakeTip = (
  <Fragment>
    <p>Defaulted Stake</p>
    <p>
      This part shows the total amount of people which have not paid on time.
      Funds that are locked in defaulted stake are not earning UNION.
    </p>
  </Fragment>
);

export const withdrawableStakeTip = (
  <Fragment>
    <p>Withdrawable Stake</p>
    <p>
      This is the stake you can actually withdraw. It is{" "}
      <i>"Your total stake"</i> <strong>minus</strong>{" "}
      <i>"Your utilized stake"</i>
    </p>
  </Fragment>
);

export const vouchingTip = (
  <Fragment>
    <p>Vouching</p>
    <p>
      Vouching for someone is similar to cosigning, you are signalling to Union
      that they can be trusted to borrow and repay. Only Union members are able
      to vouch.
    </p>
  </Fragment>
);

export const rewardsTip = (
  <Fragment>
    <p>Rewards</p>
    <p>
      This is the total number of UNION Tokens you’ve accumulated so far since
      the last claim action.
    </p>
  </Fragment>
);

export const rewardsMultiplierTip = (
  <Fragment>
    <p>Rewards multiplier</p>
    <p>
      These are the rewards you accumulated based on your utilized stake and
      whether you are a member or not. For non-members the rewards multiplier is
      0.9x and for members it is 1 + the percent of your utilized stake. For
      example if you are a member and your total stake is 1000 DAI, your
      utilized stake is 700 and you don’t have any defaulted stake, then 1 +
      700/1000 means that your reward multiplier would be 1.75x
    </p>
  </Fragment>
);

export const healthTip = (
  <Fragment>
    <p>Health</p>
    <p>
      This is how much of <strong>your</strong> vouch the voucher is currently
      using
    </p>
  </Fragment>
);

export const minimumPaymentDueTip = (
  <Fragment>
    <p>Minimum Payment Due</p>
    <p>This is the amount you need to repay monthly</p>
  </Fragment>
);

export const unionPerYearTip = (
  <Fragment>
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
  </Fragment>
);

export const percentUtilizedTip = (
  <Fragment>
    <p>Percent Utilized</p>
    <p>Calculated percentage usage of your available credit.</p>
  </Fragment>
);

export const utilizedVouchTip = (
  <Fragment>
    <p>Utilized</p>
    <p>
      This is how much of your voucher/backers vouch you are current using, if
      you default, this is how much of their funds will be locked.
    </p>
  </Fragment>
);

export const feeTip = (
  <Fragment>
    <p>Fee</p>
    <p>Union's marginal fee, we use this to keep the lights on.</p>
  </Fragment>
);
