const activityLabels = {
  becomeMember: { label: "Registered" },
  claim: ({ amount }, failed) => ({
    label: `Claimed ${amount} UNION`,
    failed,
  }),
  delegate: ({ address }, failed) => ({
    label: `Delegated to ${address}`,
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
    label: `Trusted ${address} with`,
    amount,
    failed,
  }),
  adjustVouch: ({ address, amount }, failed) => ({
    label: `Trusted ${address} with`,
    amount,
    failed,
  }),
};

export default activityLabels;
