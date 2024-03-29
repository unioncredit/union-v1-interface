import {
  Button,
  Box,
  Card,
  Grid,
  Table,
  ModalOverlay,
  Input,
  Pagination,
  Select,
  Collapse,
  EmptyState,
  Heading,
  Label,
  TableRow,
  TableHead,
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
  ManageContactModal,
  EditVouchModal,
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

import "./contacts.scss";

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
        <Modal
          title="Contact details"
          onClose={onClose}
          size="large"
          className="contactDetailsModal"
        >
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
      ? `Accounts you trust · ${data?.length || 0}`
      : `Accounts that trust you · ${data?.length || 0}`;

  const subTitle =
    contactsType === ContactsType.YOU_TRUST
      ? "Addresses you’re currently vouching for"
      : "Addresses providing you with credit";

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
                <Box fluid p="12px">
                  {!isEmpty && (
                    <>
                      <Input
                        {...register("query")}
                        prefix={<Search />}
                        placeholder="Search"
                      />
                      <Button
                        ml="8px"
                        fluid
                        icon={Filter}
                        variant="secondary"
                        onClick={toggleFilters}
                      />
                      {contactsType === ContactsType.YOU_TRUST && (
                        <Button
                          fluid
                          ml="8px"
                          label="New vouch"
                          icon={Vouch}
                          onClick={openVouchModal}
                        />
                      )}
                    </>
                  )}
                </Box>
                <Collapse active={showFilters}>
                  <Box pl="12px" pb="12px" pr="12px">
                    <Card packed overflow>
                      <Card.Body>
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
                  </Box>
                </Collapse>
                <Table>
                  <TableRow>
                    <TableHead />
                    <TableHead>Account</TableHead>
                    {contactsType === ContactsType.YOU_TRUST && (
                      <TableHead align="center" className="hide-lt-400">
                        Status
                      </TableHead>
                    )}
                    <TableHead align="right">Trust Limit (DAI)</TableHead>
                  </TableRow>
                  {isLoading ? (
                    createArray(3).map((_, i) => (
                      <ContactsListItemSkeleton
                        key={i}
                        variant={contactsType}
                      />
                    ))
                  ) : pagedData?.length <= 0 ? (
                    <Box fluid m="12px">
                      <EmptyState label="No contacts" />
                    </Box>
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
                  pages={maxPages}
                  activePage={page}
                  onClick={setPage}
                />
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
                <Card mt="24px" overflow>
                  <ContactDetailsVariant
                    {...selectedContact}
                    onClose={() => setSelectedContact(null)}
                    contactsType={contactsType}
                  />
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
