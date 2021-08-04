import Head from "next/head";

export function PageHead({ title }) {
  return (
	  <Head>
	    <title>{title}</title>
	    <meta property="og:title" content={title} />
	    <meta name="twitter:title" content={title} />
	  </Head>
  );
}
