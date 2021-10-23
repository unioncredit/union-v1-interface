import { PageHead } from "components-ui";
import ProposalsView from "views/governance/proposals";

export default function ProposalsPage() {
  return (
    <>
      <PageHead title="Proposals | Union" />
      <ProposalsView />
    </>
  );
}
