import {
  Button,
  Box,
  Card,
  Grid,
  Table,
  ModalOverlay,
  Input,
  Divider,
  Pagination,
  ButtonRow,
  Select,
} from "union-ui";
import {
  Modal,
  View,
  ContactsListItem,
  ContactsListItemSkeleton,
  ContactDetailsCard,
  ContactDetailsSkeleton,
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
import Search from "union-ui/lib/icons/search.svg";
import Vouch from "union-ui/lib/icons/vouch.svg";
import Filter from "union-ui/lib/icons/filter.svg";
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
import useFilterContacts from "hooks/useFilterContacts";

const statusOptions = [
  { id: "all", label: "All statuses" },
  { id: "defaulted", label: "Defaulted" },
  { id: "healthy", label: "Healthy" },
];

const oderByOptions = [
  { id: "all", label: "Order by" },
  { id: "trust-ascending", label: <>Trust amount &middot; Ascending</> },
  { id: "trust-descending", label: <>Trust amount &middot; Descending</> },
  { id: "label-a-z", label: <>Label &middot; A {"->"} Z</> },
  { id: "label-z-a", label: <>Label &middot; Z {"->"} A</> },
];

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

export default function ContactsView({
  contactsType = ContactsType.TRUSTS_YOU,
}) {
  usePopTrustModal();

  const isMobile = useIsMobile();
  const router = useRouter();

  const [showFilters, setShowFilters] = useState(false);
  const [selectedContactIndex, setSelectedContact] = useState(0);

  const { isOpen: isManageContactModalOpen } = useManageContactModal();
  const { isOpen: isEditAliasModalOpen } = useEditAliasModal();
  const { isOpen: isEditVouchModalOpen } = useEditVouchModal();
  const { open: openVouchModal } = useVouchModal();
  const { isOpen: isWriteOffDebtModalOpen } = useWriteOffDebtModal();

  const { data: trustData } = useTrustData();
  const { data: vouchData } = useVouchData();

  const data = contactsType === ContactsType.TRUSTS_YOU ? vouchData : trustData;

  const isLoading = !data;

  const { data: filteredData, setFilter, setOrderBy } = useFilterContacts(data);

  const { data: searchData, register } = useContactsSearch(filteredData);

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
  const queryContact = query?.contact;

  const toggleFilters = () => {
    setShowFilters((x) => !x);
  };

  const handleSelectContact = (contact) => () => {
    const contactIndex = data.findIndex(
      ({ address }) => address === contact.address
    );
    if (~contactIndex) {
      setSelectedContact(contactIndex);
    }
  };

  useEffect(() => {
    if (!vouchData || !trustData) return;

    const data =
      contactsType === ContactsType.TRUSTS_YOU ? vouchData : trustData;

    if (queryContact) {
      const contactIndex = data.findIndex(
        ({ address }) => address === queryContact
      );
      setSelectedContact(~contactIndex ? contactIndex : 0);
      return;
    }
  }, [vouchData, trustData, contactsType, queryContact]);

  const title =
    contactsType === ContactsType.YOU_TRUST
      ? "Accounts you trust"
      : "Accounts who trust you";

  const subTitle =
    contactsType === ContactsType.YOU_TRUST
      ? "Accounts you’re currently vouching for"
      : "Accounts providing you with credit";

  const selectedContact = data?.[selectedContactIndex];

  return (
    <>
      <View tabItems={config.tabItems}>
        <Grid>
          <Grid.Row justify="center">
            <Grid.Col md={6}>
              <Card mt="24px">
                <Card.Header title={title} subTitle={subTitle} />
                <Card.Body>
                  <ButtonRow mb="8px">
                    {contactsType === ContactsType.YOU_TRUST && (
                      <Button
                        fluid
                        label="New vouch"
                        icon={Vouch}
                        onClick={openVouchModal}
                      />
                    )}
                    <Button
                      fluid
                      icon={Filter}
                      variant="secondary"
                      label={`${showFilters ? "Hide" : "Show"} filters`}
                      onClick={toggleFilters}
                    />
                  </ButtonRow>
                  {showFilters && (
                    <Card variant="packed">
                      <Card.Body>
                        <Input
                          ref={register}
                          name="query"
                          suffix={<Search />}
                          placeholder="Filter by ENS or address"
                        />
                        {contactsType === ContactsType.YOU_TRUST && (
                          <Box mt="8px">
                            <Select
                              options={statusOptions}
                              onChange={({ id }) => {
                                setFilter(id);
                              }}
                              defaultValue={statusOptions[0]}
                            />
                          </Box>
                        )}
                        <Box mt="8px">
                          <Select
                            options={oderByOptions}
                            onChange={({ id }) => {
                              setOrderBy(id);
                            }}
                            defaultValue={oderByOptions[0]}
                          />
                        </Box>
                      </Card.Body>
                    </Card>
                  )}
                  <Divider mt="16px" mb="16px" />
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
                            onClick={handleSelectContact(item)}
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
              <Card mt="24px">
                <Card.Body>
                  {selectedContact ? (
                    <ContactDetailsVariant
                      {...selectedContact}
                      onClose={() => setSelectedContact(null)}
                      contactsType={contactsType}
                    />
                  ) : (
                    <ContactDetailsSkeleton />
                  )}
                </Card.Body>
              </Card>
            </Grid.Col>
          </Grid.Row>
        </Grid>
      </View>

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
