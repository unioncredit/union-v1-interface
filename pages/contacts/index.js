import { useWeb3React } from "@web3-react/core";
import LoggedOutView from "views/loggedOut";
import ContactsView from "views/contacts";
import { PageHead, CheckIsMember } from "components-ui";
import { ContactsType } from "constants/app";
import Head from "next/head";
import { useRouter } from "next/router";

export default function ContactsPage() {
  const { account, library } = useWeb3React();
  const router = useRouter();

  const query = router.query;

  return (
    <>
      <PageHead title="Contacts | Union" />
      {query.address && (
        <Head>
          <meta
            key="og:image"
            property="og:image"
            content={`https://app.union.finance/api/og/profile?address=${query.address}`}
          />
          <meta
            key="twitter:image"
            property="twitter:image"
            content={`https://app.union.finance/api/og/profile?address=${query.address}`}
          />
          <meta
            property="twitter:title"
            key="twitter:title"
            content={`Union Member ${query.address}`}
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
