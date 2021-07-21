const Active = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx={8} cy={8} r={4} fill="currentColor" />
  </svg>
);

const Failed = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path
      d="M4.79 12.766l7.96-8-1.54-1.532-7.96 8 1.54 1.532zM3.233 4.789l8 7.96 1.532-1.538-8-7.96-1.532 1.538z"
      fill="currentColor"
    />
  </svg>
);

const Passed = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path
      d="M6.294 12l-.707.707.779.779.7-.85L6.294 12zM2.293 9.413l3.294 3.294 1.414-1.414-3.294-3.294-1.414 1.414zm4.773 3.223l6.588-8-1.544-1.272-6.588 8 1.544 1.272z"
      fill="currentColor"
    />
  </svg>
);

const NoVote = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path fill="currentColor" d="M3 7h10v2H3z" />
  </svg>
);

const Status = {
  Active,
  Failed,
  Passed,
  NoVote,
};

export default Status;
