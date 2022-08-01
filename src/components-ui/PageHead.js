import { Helmet } from "react-helmet";

export function PageHead({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" key="og:title" content={title} />
      <meta name="twitter:title" key="twitter:title" content={title} />
      <meta property="og:type" key="og:type" content="website" />
      <meta
        name="description"
        key="description"
        content="Credit backed by trust. Union works without the need for collateral, credit score, or revealing personal information on a public ledger."
      />
      <meta
        property="og:description"
        key="og:description"
        content="Credit backed by trust. Union works without the need for collateral, credit score, or revealing personal information on a public ledger."
      />
      <meta
        name="twitter:description"
        key="twitter:description"
        content="Credit backed by trust. Union works without the need for collateral, credit score, or revealing personal information on a public ledger."
      />
    </Helmet>
  );
}
