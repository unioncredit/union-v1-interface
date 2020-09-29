import GovernanceProposal from "components/GovernanceProposal";

const GovernanceVotingHistory = () => {
  return (
    <div className="bg-white rounded border">
      <div className="p-2">
        {new Array(5)
          .fill({ vote: "For", status: "Passed", type: "Offchain" })
          .map((vote, i) => (
            <GovernanceProposal key={i} id={i + 1} {...vote} />
          ))}
      </div>
    </div>
  );
};

export default GovernanceVotingHistory;
