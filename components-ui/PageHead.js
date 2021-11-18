import Head from "next/head";

export function PageHead({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" key="og:title" content={title} />
      <meta name="twitter:title" key="twitter:title" content={title} />
    </Head>
  );
}
