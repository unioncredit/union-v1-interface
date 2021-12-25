import { useWeb3React } from "@web3-react/core";
import LoggedOutView from "views/loggedOut";
import ContactsView from "views/contacts";
import { PageHead, CheckIsMember } from "components-ui";
import { ContactsType } from "constants/app";
import Head from "next/head";

export default function ContactsPage({ params, host }) {
  const { account, library } = useWeb3React();

  const address = params?.address;

  return (
    <>
      <PageHead title="Contacts | Union" />
      {address && (
        <Head>
          <meta
            key="og:image"
            property="og:image"
            content={`https://${host}/api/og/profile?address=${address}`}
          />
          <meta
            key="twitter:image"
            property="twitter:image"
            content={`https://${host}/api/og/profile?address=${address}`}
          />
          <meta
            property="twitter:title"
            key="twitter:title"
            content={`Union Member ${address}`}
          />
        </Head>
      )}

      {account && library ? (
        <CheckIsMember>
          <ContactsView contactsType={ContactsType.YOU_TRUST} />
        </CheckIsMember>
      ) : (
        <LoggedOutView />
      )}
    </>
  );
}

export function getServerSideProps(context) {
  return {
    props: { params: context.query || null, host: context.req.headers.host },
  };
}
