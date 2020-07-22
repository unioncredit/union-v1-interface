export const utilizedStakeTip =
  "Utilized Stake.\n\nThis is the stake that is currently being used by someone. It cannot be withdrawn.";

export const defaultedStakeTip =
  "Defaulted Stake.\n\nThis part shows the total amount of people which have not paid on time. Funds that are locked in defaulted stake are not earning UPY";

export const withdrawableStakeTip =
  'Withdrawable Stake.\n\nThis is the stake you can actually withdraw. It is "Your total stake” minus “Your utilized stake"';

export const vouchingTip =
  "Vouching.\n\nVouching for someone is similar to cosigning, you are signalling to Union that they can be trusted to borrow and repay. Only UNION members are able to vouch.";

export const rewardsTip =
  "Rewards.\n\nThis is the total number of Union Tokens you’ve accumulated so far.";

export const rewardsMultiplierTip =
  "Rewards multiplier.\n\nThese are the rewards you accumulated based on your utilized stake and whether you are a member or not. For non-members the rewards multiplier is 0.9x and for members it is 1 + the percent of your utilized stake. For example if you are a member and your total stake is 1000 DAI, your utilized stake is 700 and you don’t have any defaulted stake, then 1 + 700/1000 means that your reward multiplier would be 1.75x";

export const healthTip =
  "Health.\n\nThis is how the member you trust is behaving regarding repaying what they owed";

export const minimumPaymentDueTip =
  "Minimum Payment Due.\n\nThis is the amount you need to repay monthly";

export const unionPerYearTip =
  'UNION Per Year.\n\nThis is the token that the staking contract returns to the user that is based on the DAI staked and reward multiplier algorithm. Each block inflates based on the total amount of DAI staked.\n\nYour share of the inflation is:\n\n"Your not defaulted DAI stake" times "your reward multiplier" divided by "Sum of everyone elses above number"';

export const percentUtilizedTip = "Percent Utilized\n\n";
