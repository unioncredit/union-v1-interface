import { useWeb3React } from "@web3-react/core";
import LoggedOutView from "views/loggedOut";
import ContactsView from "views/contacts";
import { PageHead } from "components-ui";

export default function ContactsPage() {
  const { account, library } = useWeb3React();

  return (
    <>
      <PageHead title="Contacts | Union" />
      {account && library ? <ContactsView /> : <LoggedOutView />}
    </>
  );
}
