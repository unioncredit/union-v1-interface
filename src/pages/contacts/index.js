import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";

import ContactsView from "views/contacts";
import LoggedOutView from "views/loggedOut";
import { ContactsType } from "constants/app";
import { PageHead, CheckIsMember } from "components-ui";

export default function ContactsPage() {
  const { address } = useParams();
  const { account, library } = useWeb3React();

  const host = window.location.host;

  return (
    <>
      <PageHead title="Contacts | Union" />
      {address && (
        <Helmet>
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
        </Helmet>
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
