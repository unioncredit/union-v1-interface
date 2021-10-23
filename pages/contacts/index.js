import { useWeb3React } from "@web3-react/core";
import LoggedOutView from "views/loggedOut";
import ContactsView from "views/contacts";
import { PageHead, CheckIsMember } from "components-ui";
import { ContactsType } from "constants/app";

export default function ContactsPage() {
  const { account, library } = useWeb3React();

  return (
    <>
      <PageHead title="Contacts | Union" />
      {account && library ? (
        <CheckIsMember>
          <ContactsView contactsType={ContactsType.TRUSTS_YOU} />
        </CheckIsMember>
      ) : (
        <LoggedOutView />
      )}
    </>
  );
}
