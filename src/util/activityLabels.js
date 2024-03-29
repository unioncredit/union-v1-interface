import { formatEther, formatUnits } from "@ethersproject/units";
import format from "./formatValue";
import truncateAddress from "./truncateAddress";

const activityLabels = {
  becomeMember: { label: "Registered" },
  claim: ({ amount, hash }, failed) => ({
    hash,
    label: `Claimed ${format(formatUnits(amount))} UNION`,
    failed,
  }),
  unwrap: ({ balance, hash }, failed) => ({
    hash,
    label: `Unwrapped ${format(formatUnits(balance))} UNION`,
    failed,
  }),
  delegate: ({ address, hash }, failed) => ({
    label: address
      ? `Delegated to ${truncateAddress(address)}`
      : "Delegation failed",
    failed,
    hash,
  }),
  repay: ({ hash, amount }, failed) => ({
    label: "Repaid",
    amount,
    failed,
    hash,
  }),
  deposit: ({ hash, amount }, failed) => ({
    label: "Staked",
    hash,
    amount,
    failed,
  }),
  borrow: ({ amount, hash }, failed) => ({
    label: "Borrowed",
    amount,
    failed,
    hash,
  }),
  withdraw: ({ hash, amount }, failed) => ({
    label: "Withdraw",
    amount,
    failed,
    hash,
  }),
  newVouch: ({ hash, address, amount }, failed) => ({
    label: `Trusted ${truncateAddress(address)} with`,
    amount,
    hash,
    failed,
  }),
  adjustVouch: ({ hash, address, amount }, failed) => ({
    label: `Trusted ${truncateAddress(address)} with`,
    amount,
    hash,
    failed,
  }),
  removeContact: ({ hash, address }, failed) => ({
    label: `Removed contact ${truncateAddress(address)}`,
    failed,
    hash,
  }),
  writeOffDebt: ({ address, hash, amount }, failed) => ({
    label: `Wrote-off ${amount} DAI debt from ${truncateAddress(address)}`,
    failed,
    hash,
  }),
  vote: ({ proposalId, type, hash }, failed) => ({
    label: `Voted ${type} proposal ${proposalId}`,
    failed,
    hash,
  }),
  approve: ({ token, hash }, failed) => ({
    label: `Approved ${truncateAddress(token)}`,
    failed,
    hash,
  }),
};

export default activityLabels;
