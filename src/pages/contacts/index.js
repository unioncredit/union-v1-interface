import { useWeb3React } from "@web3-react/core";
import LoggedOutView from "views/loggedOut";
import ContactsView from "views/contacts";
import { PageHead, CheckIsMember } from "components-ui";
import { ContactsType } from "constants/app";
import { Helmet } from "react-helmet";

export default function ContactsPage() {
  const { account, library } = useWeb3React();

  // TODO;
  const host = null;
  const address = null;

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
