import {
  ProposalStatusBadge,
  ProposalTypeBadge,
} from "components/GovernanceProposal";
import GovernanceProposalHistory from "components/GovernanceProposalHistory";
import GovernanceProposalVote from "components/GovernanceProposalVote";
import GovernanceProposalVotePanel from "components/GovernanceProposalVotePanel";
import Link from "next/link";
import { Fragment } from "react";
import LinkArrow from "svgs/LinkArrow";

export default function ProposalView() {
  return (
    <Fragment>
      <h1 hidden>Proposal</h1>

      <div className="container-lg">
        {/* Spacer */}
        <div className="h-8" />

        <div>
          <Link href="/governance">
            <a className="font-semibold inline-flex align-middle items-center">
              <LinkArrow.Left /> <span className="ml-1">Back</span>
            </a>
          </Link>
        </div>

        {/* Spacer */}
        <div className="h-8" />

        <div className="grid grid-cols-12">
          <div className="col-span-7">
            <h1>
              Should we merge the latest commit made arround updating our FAQ
              Page?
            </h1>

            {/* Spacer */}
            <div className="h-4" />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <ProposalTypeBadge type="Offchain" className="bg-white" />
                <p className="text-type-light">Executed on Aug 3, 2020</p>
              </div>
              <ProposalStatusBadge status="Active" />
            </div>

            {/* Spacer */}
            <div className="h-12" />

            <h2 className="text-xl">Summary</h2>

            {/* Spacer */}
            <div className="h-4" />

            <div className="space-y-4 font-normal text-lg">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                deleniti accusantium id veritatis est eius maiores, neque ut
                error. Ratione, corporis dolores vitae temporibus at modi?
                Aspernatur aliquid molestias provident.
              </p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Delectus, aspernatur itaque neque eaque praesentium libero
                quaerat autem facere maxime non voluptatibus ratione ipsum
                perspiciatis fuga enim dolorem soluta dicta hic.
              </p>
            </div>

            {/* Spacer */}
            <div className="h-12" />

            <div className="bg-white rounded border">
              <div className="px-4 sm:px-6 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <button className="px-4 py-4 font-semibold text-type-base border-b-2 border-pink-3-pure">
                      All
                    </button>
                    <button className="px-4 py-4 font-semibold text-type-light border-b-2 border-transparent">
                      For
                    </button>
                    <button className="px-4 py-4 font-semibold text-type-light border-b-2 border-transparent">
                      Against
                    </button>
                  </div>
                </div>

                <div className="divider -mt-px" />
              </div>

              <div className="p-2">
                {new Array(4).fill("").map((_, i) => (
                  <GovernanceProposalVote key={i} />
                ))}
              </div>

              {/* Spacer */}
              <div className="h-4" />
            </div>
          </div>
          <div className="col-span-1" />
          <div className="col-span-4">
            <GovernanceProposalVotePanel />

            {/* Spacer */}
            <div className="h-8" />

            <GovernanceProposalHistory />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
