import { PageHead } from "components-ui";
import ProposalView from "views/governance/proposal";

export default function ProposalsPage() {
  return (
    <>
      <PageHead title="Proposal | Union" />
      <ProposalView />
    </>
  );
}
