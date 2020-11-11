import classNames from "classnames";
import Proposal, { ProposalSkeleton } from "components/governance/Proposal";
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

const ProposalsList = ({ showAll = false }) => {
  const [statusFilter, statusFilterSet] = useState("all");
  const [typeFilter, typeFilterSet] = useState("all");

  const data = useFilteredProposalData(statusFilter, typeFilter);

  const hasProposals = data && data.length > 0;

  const updateStatusFilter = (type) => () => statusFilterSet(type);

  const updateTypeFilter = (type) => () => typeFilterSet(type);

  return (
    <div className="md:bg-white md:rounded md:border">
      <div className="md:px-6 md:pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 overflow-x-scroll whitespace-no-wrap hide-scrollbar">
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
              onClick={updateStatusFilter("passed")}
              isActive={statusFilter === "passed"}
              label="Passed"
            />
            <StatusFilterButton
              onClick={updateStatusFilter("failed")}
              isActive={statusFilter === "failed"}
              label="Failed"
            />
            <StatusFilterButton
              onClick={updateStatusFilter("executed")}
              isActive={statusFilter === "executed"}
              label="Executed"
            />
          </div>

          <div className="hidden md:flex items-center space-x-1">
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

      <div className="pt-4 md:pt-0 md:p-2">
        {hasProposals ? (
          data
            .slice(0, showAll ? data.length : 5)
            .map((proposal, i) => <Proposal key={i} {...proposal} />)
        ) : (
          <div className="space-y-8 md:space-y-0">
            <ProposalSkeleton />
            <ProposalSkeleton />
            <ProposalSkeleton />
            <ProposalSkeleton />
            <ProposalSkeleton />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalsList;
