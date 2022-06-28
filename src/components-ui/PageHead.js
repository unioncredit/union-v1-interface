import { Helmet } from "react-helmet";

export function PageHead({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" key="og:title" content={title} />
      <meta name="twitter:title" key="twitter:title" content={title} />
    </Helmet>
  );
}
