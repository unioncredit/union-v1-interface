import classNames from "classnames";
import GovernanceProposal from "components/GovernanceProposal";
import useFilteredProposalData from "hooks/governance/useFilteredProposalData";
import { useState } from "react";

const StatusFilterButton = ({ onClick, label, isActive }) => {
  const cachedClassNames = classNames(
    "px-4 py-4 font-semibold focus:outline-none transition-colors duration-150",
    isActive
      ? "text-type-base border-b-2 border-pink-3-pure"
      : "text-type-light border-b-2 border-transparent"
  );

  return (
    <button onClick={onClick} className={cachedClassNames}>
      {label}
    </button>
  );
};

const TypeFilterButton = ({ onClick, label, isActive }) => {
  const cachedClassNames = classNames(
    "px-4 py-4 font-semibold  border-b-2 border-transparent focus:outline-none transition-colors duration-150",
    isActive ? "text-pink-3-pure" : "text-type-light"
  );

  return (
    <button onClick={onClick} className={cachedClassNames}>
      {label}
    </button>
  );
};

const GovernanceProposals = ({ showAll = false }) => {
  const [statusFilter, statusFilterSet] = useState("all");
  const [typeFilter, typeFilterSet] = useState("all");

  const data = useFilteredProposalData(statusFilter, typeFilter);

  const hasProposals = data && data.length > 0;

  const updateStatusFilter = (type) => () => statusFilterSet(type);

  const updateTypeFilter = (type) => () => typeFilterSet(type);

  return (
    <div className="bg-white rounded border">
      <div className="px-4 sm:px-6 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <StatusFilterButton
              onClick={updateStatusFilter("all")}
              isActive={statusFilter === "all"}
              label="All"
            />
            <StatusFilterButton
              onClick={updateStatusFilter("active")}
              isActive={statusFilter === "active"}
              label="Active"
            />
            <StatusFilterButton
              onClick={updateStatusFilter("succeeded")}
              isActive={statusFilter === "succeeded"}
              label="Passed"
            />
            <StatusFilterButton
              onClick={updateStatusFilter("defeated")}
              isActive={statusFilter === "defeated"}
              label="Failed"
            />
            <StatusFilterButton
              onClick={updateStatusFilter("executed")}
              isActive={statusFilter === "executed"}
              label="Executed"
            />
          </div>

          <div className="flex items-center space-x-1">
            <TypeFilterButton
              onClick={updateTypeFilter("all")}
              isActive={typeFilter === "all"}
              label="Both"
            />
            <TypeFilterButton
              onClick={updateTypeFilter("onchain")}
              isActive={typeFilter === "onchain"}
              label="Onchain"
            />
            <TypeFilterButton
              onClick={updateTypeFilter("offchain")}
              isActive={typeFilter === "offchain"}
              label="Offchain"
            />
          </div>
        </div>

        <div className="divider -mt-px" />
      </div>

      <div className="p-2">
        {hasProposals &&
          data
            .slice(0, showAll ? -1 : 5)
            .map((proposal, i) => <GovernanceProposal key={i} {...proposal} />)}
      </div>
    </div>
  );
};

export default GovernanceProposals;
