import format from "./formatValue";
import truncateAddress from "./truncateAddress";

const activityLabels = {
  becomeMember: { label: "Registered" },
  claim: ({ amount }, failed) => ({
    label: `Claimed ${format(amount)} UNION`,
    failed,
  }),
  delegate: ({ address }, failed) => ({
    label: `Delegated to ${truncateAddress(address)}`,
    failed,
  }),
  repay: ({ amount }, failed) => ({
    label: "Repaid",
    amount,
    failed,
  }),
  deposit: ({ hash, amount }, failed) => ({
    label: "Staked",
    hash,
    amount,
    failed,
  }),
  borrow: ({ amount }, failed) => ({
    label: "Borrowed",
    amount,
    failed,
  }),
  withdraw: ({ amount }, failed) => ({
    label: "Withdraw",
    amount,
    failed,
  }),
  newVouch: ({ address, amount }, failed) => ({
    label: `Trusted ${truncateAddress(address)} with`,
    amount,
    failed,
  }),
  adjustVouch: ({ address, amount }, failed) => ({
    label: `Trusted ${truncateAddress(address)} with`,
    amount,
    failed,
  }),
  removeContact: ({ address }, failed) => ({
    label: `Removed contact ${truncateAddress(address)}`,
    failed,
  }),
};

export default activityLabels;
