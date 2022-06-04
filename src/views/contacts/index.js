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
  Collapse,
  EmptyState,
  Heading,
  Label,
} from "@unioncredit/ui";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ReactComponent as Search } from "@unioncredit/ui/lib/icons/search.svg";
import { ReactComponent as Vouch } from "@unioncredit/ui/lib/icons/vouch.svg";
import { ReactComponent as Filter } from "@unioncredit/ui/lib/icons/filter.svg";

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
  EditVouchModal,
  useEditVouchModal,
  VouchModalManager,
  useWriteOffDebtModal,
  WriteOffDebtModal,
  VouchModal,
} from "components-ui/modals";
import createArray from "util/createArray";
import { ContactsType } from "constants/app";
import useIsMobile from "hooks/useIsMobile";
import usePagination from "hooks/usePagination";
import useTrustData from "hooks/data/useTrustData";
import useVouchData from "hooks/data/useVouchData";
import useContactsSearch from "hooks/useContactsSearch";
import usePopTrustModal from "hooks/usePopTrustModal";
import useFilterContacts from "hooks/useFilterContacts";

import { config } from "./config";

const statusOptions = [
  { id: "all", label: "All statuses" },
  { id: "member", label: "Member" },
  { id: "notAMember", label: "Not a member" },
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
      <ModalOverlay onClick={onClose}>
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
  const [searchParams] = useSearchParams();

  const [showFilters, setShowFilters] = useState(false);
  const [selectedContactIndex, setSelectedContact] = useState(null);

  const { data: trustData } = useTrustData();
  const { data: vouchData } = useVouchData();
  const { open: openVouchModal } = useVouchModal();

  const data = contactsType === ContactsType.TRUSTS_YOU ? vouchData : trustData;

  const { data: filteredData, setFilter, setOrderBy } = useFilterContacts(data);

  const { data: searchData, register } = useContactsSearch(filteredData);

  const {
    data: pagedData,
    page,
    maxPages,
    setPage,
  } = usePagination(searchData);

  const queryContact = searchParams.get("contact");

  useEffect(() => {
    if (!vouchData || !trustData || selectedContactIndex !== null) return;

    const data =
      contactsType === ContactsType.TRUSTS_YOU ? vouchData : trustData;

    if (queryContact) {
      const contactIndex = data.findIndex(
        ({ address }) => address === queryContact
      );
      setSelectedContact(~contactIndex ? contactIndex : 0);
      return;
    } else {
      !isMobile && setSelectedContact(0);
    }
  }, [vouchData, trustData, contactsType, queryContact]);

  const ContactDetailsVariant = isMobile
    ? withMobileView(ContactDetailsCard)
    : ContactDetailsCard;

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

  const isLoading = !data;

  const title =
    contactsType === ContactsType.YOU_TRUST
      ? "Accounts you vouch for"
      : "Accounts vouching for you";

  const subTitle =
    contactsType === ContactsType.YOU_TRUST
      ? "Accounts you’re currently vouching for"
      : "Accounts providing you with credit";

  const selectedContact = data?.[selectedContactIndex];

  const isEmpty = !isLoading && data?.length <= 0;

  return (
    <>
      <View tabItems={config.tabItems}>
        <Grid>
          <Grid.Row justify="center">
            <Grid.Col md={6}>
              <Card mt="24px">
                <Card.Header title={title} subTitle={subTitle} />
                <Card.Body>
                  {!isEmpty && (
                    <ButtonRow
                      mb="8px"
                      direction={isMobile ? "vertical" : "horizontal"}
                    >
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
                  )}
                  <Collapse active={showFilters}>
                    <Card packed>
                      <Card.Body>
                        <Input
                          {...register("query")}
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
                  </Collapse>
                  <Divider mt="16px" mb="16px" />
                  <Table noBorder noPadding mb="20px" disableCondensed>
                    {isLoading ? (
                      createArray(3).map((_, i) => (
                        <ContactsListItemSkeleton key={i} />
                      ))
                    ) : pagedData?.length <= 0 ? (
                      <EmptyState label="No contacts" />
                    ) : (
                      pagedData.map((item) => (
                        <ContactsListItem
                          {...item}
                          active={item.address === selectedContact?.address}
                          variant={contactsType}
                          key={`${item.address}-${contactsType}`}
                          onClick={handleSelectContact(item)}
                        />
                      ))
                    )}
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
              {isEmpty && (
                <Card mt="24px" variant="blue">
                  <Card.Body>
                    <Heading align="center" mb="4px">
                      Make your first vouch
                    </Heading>
                    <Label as="p" align="center" mb="16px">
                      You can use your staked DAI to provide vouches to other
                      Ethereum addresses. When you vouch for an account, that
                      account gets access to credit backed by your vouch.
                    </Label>
                    <Box fluid justify="center">
                      <Button
                        label="Vouch for someone"
                        icon={Vouch}
                        onClick={openVouchModal}
                      />
                    </Box>
                  </Card.Body>
                </Card>
              )}

              {selectedContact && (
                <Card mt="24px">
                  <Card.Body>
                    <ContactDetailsVariant
                      {...selectedContact}
                      onClose={() => setSelectedContact(null)}
                      contactsType={contactsType}
                    />
                  </Card.Body>
                </Card>
              )}

              {!isEmpty && !selectedContact && !isMobile && (
                <Card mt="24px">
                  <Card.Body>
                    <ContactDetailsSkeleton
                      shimmer={Array.isArray(data) && data.length > 0}
                    />
                  </Card.Body>
                </Card>
              )}
            </Grid.Col>
          </Grid.Row>
        </Grid>
      </View>

      <VouchModal />
      <ManageContactModal
        {...selectedContact}
        contactType={contactsType}
        isLabelOnly={contactsType === ContactsType.TRUSTS_YOU}
      />
      <EditVouchModal {...selectedContact} />
      <WriteOffDebtModal {...selectedContact} />
    </>
  );
}
