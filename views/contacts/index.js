import {
  Button,
  Box,
  Card,
  Grid,
  ToggleMenu,
  Table,
  ModalOverlay,
  Input,
  Divider,
  Pagination,
  Icon,
} from "union-ui";
import {
  Modal,
  Wrapper,
  ContactDetails,
  ContactsListItem,
  ContactDetailsHeader,
  ContactsListItemSkeleton,
} from "components-ui";
import {
  useVouchModal,
  useManageContactModal,
  ManageContactModal,
  EditAliasModal,
  useEditAliasModal,
  EditVouchModal,
  useEditVouchModal,
  VouchModalManager,
  useWriteOffDebtModal,
  WriteOffDebtModal,
} from "components-ui/modals";
import { useState, useEffect } from "react";
import useTrustData from "hooks/data/useTrustData";
import useVouchData from "hooks/data/useVouchData";
import useContactsSearch from "hooks/useContactsSearch";
import usePagination from "hooks/usePagination";
import createArray from "util/createArray";

import { config } from "./config";
import { ContactsType } from "constants/app";
import usePopTrustModal from "hooks/usePopTrustModal";
import { useRouter } from "next/router";
import useIsMobile from "hooks/useIsMobile";

const withMobileView =
  (Component) =>
  ({ onClose, contactsType, ...props }) =>
    (
      <ModalOverlay>
        <Modal title="Contact details" onClose={onClose} size="large">
          <Component {...props} variant={contactsType} />
        </Modal>
      </ModalOverlay>
    );

const ContactDetailsCard = ({ contactsType, ...props }) => {
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
};

export default function ContactsView() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [contactsType, setContactsType] = useState(ContactsType.TRUSTS_YOU);
  const [selectedContact, setSelectedContact] = useState(null);

  const { isOpen: isManageContactModalOpen } = useManageContactModal();
  const { isOpen: isEditAliasModalOpen } = useEditAliasModal();
  const { isOpen: isEditVouchModalOpen } = useEditVouchModal();
  const { open: openVouchModal } = useVouchModal();
  const { isOpen: isWriteOffDebtModalOpen } = useWriteOffDebtModal();

  const { data: trustData } = useTrustData();
  const { data: vouchData } = useVouchData();

  const data = contactsType === ContactsType.TRUSTS_YOU ? vouchData : trustData;
  const isLoading = !data;

  const { data: searchData, register } = useContactsSearch(data);
  const {
    data: pagedData,
    page,
    maxPages,
    setPage,
  } = usePagination(searchData);

  const ContactDetailsVariant = isMobile
    ? withMobileView(ContactDetailsCard)
    : ContactDetailsCard;

  const query = router.query;
  const contactsTypeOverride = query?.contactsType;
  const queryContact = query?.contact;

  const handleToggleContactType = (item) => {
    if (item.id === contactsType) return;
    setSelectedContact(null);
    setContactsType(item.id);
  };

  useEffect(() => {
    if (contactsTypeOverride && contactsType !== contactsTypeOverride) {
      setContactsType(contactsTypeOverride);
    }
  }, [contactsTypeOverride]);

  useEffect(() => {
    if (!vouchData || !trustData) return;

    const data =
      contactsType === ContactsType.TRUSTS_YOU ||
      contactsTypeOverride === ContactsType.TRUSTS_YOU
        ? vouchData
        : trustData;

    if (queryContact) {
      const contact = data.find(({ address }) => address === queryContact);
      setSelectedContact(contact || data[0]);
      return;
    }

    !isMobile && setSelectedContact(data[0]);
  }, [vouchData, trustData, contactsType, contactsTypeOverride, queryContact]);

  usePopTrustModal();

  const title =
    contactsType === ContactsType.TRUSTS_YOU
      ? "Contacts who trust you"
      : "Contacts you trust";

  return (
    <>
      <Wrapper title={config.title}>
        <ToggleMenu
          items={config.toggleItems}
          initialActive={0}
          onChange={handleToggleContactType}
        />
        <Grid>
          <Grid.Row justify="center">
            <Grid.Col md={6}>
              <Card mt="24px">
                <Card.Header title={title} />
                <Card.Body>
                  {contactsType === ContactsType.YOU_TRUST && (
                    <>
                      <Button
                        fluid
                        label="Vouch for new contact"
                        icon="vouch"
                        onClick={openVouchModal}
                      />
                      <Divider mt="16px" mb="16px" />
                    </>
                  )}
                  <Box mb="16px">
                    <Input
                      ref={register}
                      name="query"
                      suffix={<Icon name="search" />}
                      placeholder="Filter by ENS or address"
                    />
                  </Box>
                  <Table noBorder noPadding mb="20px" disableCondensed>
                    {isLoading
                      ? createArray(3).map((_, i) => (
                          <ContactsListItemSkeleton key={i} />
                        ))
                      : pagedData.map((item) => (
                          <ContactsListItem
                            {...item}
                            active={item.address === selectedContact?.address}
                            variant={contactsType}
                            key={`${item.address}-${contactsType}`}
                            onClick={(_, data) => setSelectedContact(data)}
                          />
                        ))}
                  </Table>
                  <Pagination
                    mt="24px"
                    pages={maxPages}
                    activePage={page}
                    onClick={setPage}
                  />
                </Card.Body>
              </Card>
            </Grid.Col>
            <Grid.Col md={6}>
              {selectedContact && (
                <Card mt="24px">
                  <Card.Body>
                    <ContactDetailsVariant
                      {...selectedContact}
                      onClose={() => setSelectedContact(null)}
                      setSelectedContact={setSelectedContact}
                      contactsType={contactsType}
                    />
                  </Card.Body>
                </Card>
              )}
            </Grid.Col>
          </Grid.Row>
        </Grid>
      </Wrapper>

      {/* modals */}
      <VouchModalManager />
      {isManageContactModalOpen && (
        <ManageContactModal
          {...selectedContact}
          contactsType={contactsType}
          isLabelOnly={contactsType === ContactsType.TRUSTS_YOU}
        />
      )}
      {isEditAliasModalOpen && <EditAliasModal {...selectedContact} />}
      {isEditVouchModalOpen && <EditVouchModal {...selectedContact} />}
      {isWriteOffDebtModalOpen && <WriteOffDebtModal {...selectedContact} />}
    </>
  );
}
