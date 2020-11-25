import { isAddress } from "@ethersproject/address";
import { useWeb3React } from "@web3-react/core";
import Back from "components/Back";
import ProposalVoteModal from "components/governance/modals/ProposalVoteModal";
import {
  ProposalStatusBadge,
  ProposalTypeBadge,
} from "components/governance/Proposal";
import ProposalEventHistory from "components/governance/ProposalEventHistory";
import ProposalVotePanel from "components/governance/ProposalVotePanel";
import Skeleton from "components/Skeleton";
import useProposalData from "hooks/governance/useProposalData";
import { useRouter } from "next/router";
import { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import getEtherscanLink from "util/getEtherscanLink";
import parseProposalDetails from "util/parseProposalDetails";

const Loading = {
  Description: () => (
    <Fragment>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <br />
      <br />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <br />
      <br />
      <Skeleton />
    </Fragment>
  ),
  Summary: () => (
    <Fragment>
      <div className="py-4 flex space-x-4">
        <Skeleton width={10} />
        <Skeleton />
      </div>
      <div className="py-4 flex space-x-4">
        <Skeleton width={10} />
        <Skeleton />
      </div>
      <div className="py-4 flex space-x-4">
        <Skeleton width={10} />
        <Skeleton />
      </div>
    </Fragment>
  ),
};

export default function ProposalView() {
  const { query } = useRouter();
  const { id } = query;

  const data = useProposalData(id);

  const { chainId } = useWeb3React();

  const linkIfAddress = (content) => {
    const parsed = parseProposalDetails(content);

    if (isAddress(content) && chainId) {
      return (
        <a
          className="underline"
          href={getEtherscanLink(chainId, content, "address")}
        >
          {parsed}
        </a>
      );
    }

    return <span>{parsed}</span>;
  };

  return (
    <Fragment>
      <h1 hidden>Proposal</h1>

      <div className="container-lg">
        {/* Spacer */}
        <div className="h-8" />

        <div>
          <Back />
        </div>

        {/* Spacer */}
        <div className="h-8" />

        <div className="md:grid grid-cols-12">
          <div className="mb-8 md:mb-0 col-span-7">
            <h1>{data?.title ?? <Skeleton />}</h1>

            {/* Spacer */}
            <div className="h-4" />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {data ? (
                  <ProposalTypeBadge type="Onchain" className="bg-white" />
                ) : (
                  <Skeleton width={110} height={32} />
                )}
                <p className="text-type-light capitalize">
                  {data?.date ?? <Skeleton width={200} />}
                </p>
              </div>
              {data?.status ? (
                <ProposalStatusBadge status={data?.status} />
              ) : (
                <Skeleton width={90} height={32} />
              )}
            </div>

            {/* Spacer */}
            <div className="h-12" />

            <h2 className="text-xl">Summary</h2>

            {/* Spacer */}
            <div className="h-4" />

            <ol className="divide-y border-t border-b">
              {data?.details ? (
                data?.details.map((d, i) => (
                  <li
                    key={i}
                    className="py-4 flex space-x-4 break-words break-all"
                  >
                    <span className="font-semibold">{i + 1}</span>
                    <p>
                      {linkIfAddress(d.target)}.{d.functionSig}(
                      {d.callData.split(",").map((content, i) => {
                        return (
                          <span key={i}>
                            {linkIfAddress(content)}
                            {d.callData.split(",").length - 1 === i ? "" : ","}
                          </span>
                        );
                      })}
                      )
                    </p>
                  </li>
                ))
              ) : (
                <Loading.Summary />
              )}
            </ol>

            {/* Spacer */}
            <div className="h-4" />

            <div className="font-normal text-lg">
              {data?.description ? (
                <ReactMarkdown
                  renderers={{
                    link: (props) => <a className="underline" {...props} />,
                  }}
                >
                  {data?.description}
                </ReactMarkdown>
              ) : (
                <Loading.Description />
              )}
            </div>
          </div>

          <div className="hidden md:block col-span-1" />

          <div className="col-span-4">
            <ProposalVotePanel
              id={id}
              forCount={data?.forCount}
              againstCount={data?.againstCount}
              status={data?.status}
              proposalId={id}
            />

            {/* Spacer */}
            <div className="h-8" />

            <ProposalEventHistory id={id} />
          </div>
        </div>
      </div>

      <ProposalVoteModal id={id} />
    </Fragment>
  );
}
