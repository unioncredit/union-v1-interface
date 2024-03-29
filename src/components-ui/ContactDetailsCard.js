import { Card } from "@unioncredit/ui";
import { useWeb3React } from "@web3-react/core";
import { ContactDetails } from "components-ui";
import { useManageContactModal } from "components-ui/modals";
import { ContactsType } from "constants/app";
import { MiniProfileCard } from "./MiniProfileCard";
import { RelatedHistory } from "./RelatedHistory";

export function ContactDetailsCard({ contactsType, ...props }) {
  const { open: openManageContactModal } = useManageContactModal();
  const { account } = useWeb3React();

  const relatedHistoryProps =
    contactsType === ContactsType.TRUSTS_YOU
      ? { account: props.address, staker: props.address, borrower: account }
      : { account: props.address, staker: account, borrower: props.address };

  return (
    <>
      <Card.Body>
        <MiniProfileCard {...props} />
        <ContactDetails
          {...props}
          contactsType={contactsType}
          manageContact={openManageContactModal}
        />
      </Card.Body>
      <RelatedHistory {...relatedHistoryProps} />
    </>
  );
}
