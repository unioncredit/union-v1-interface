import { ContactDetails, ContactDetailsHeader } from "components-ui";
import { useManageContactModal } from "components-ui/modals";

export function ContactDetailsCard({ contactsType, ...props }) {
  const { open: openManageContactModal } = useManageContactModal();

  return (
    <>
      <ContactDetailsHeader {...props} contactsType={contactsType} />
      <ContactDetails
        {...props}
        contactsType={contactsType}
        manageContact={openManageContactModal}
      />
    </>
  );
}
