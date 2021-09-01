import {
  Button,
  Box,
  Card,
  Grid,
  Row,
  Col,
  ToggleMenu,
  Table,
  ModalOverlay,
} from "union-ui";
import {
  Modal,
  Wrapper,
  ContactDetails,
  ContactsSummaryRow,
  ContactDetailsHeader,
  ContactsSummaryRowSkeleton,
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
import { useWindowSize } from "react-use";
import useTrustData from "hooks/data/useTrustData";
import useVouchData from "hooks/data/useVouchData";
import createArray from "util/createArray";

import { config, ContactsType } from "./config";
import usePopTrustModal from "hooks/usePopTrustModal";
import { useRouter } from "next/router";

const withMobileView =
  (Component) =>
  ({ onClose, contactsType, ...props }) =>
    (
      <ModalOverlay>
        <Modal title="Contact details" onClose={onClose}>
          <ContactDetailsHeader
            {...props}
            contactsType={contactsType}
            mobile={true}
          />
          <Component {...props} variant={contactsType} />
        </Modal>
      </ModalOverlay>
    );

export default function ContactsView() {
  const { width } = useWindowSize();
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

  const query = router.query;
  const contactsTypeOverride = query?.contactsType;
  const queryContact = query?.contact;

  const handleToggleContactType = (item) => {
    if (item.id === contactsType) return;
    setSelectedContact(null);
    setContactsType(item.id);
  };

  const isMobile = width <= 600;

  useEffect(() => {
    if (contactsType !== contactsTypeOverride) {
      setContactsType(contactsTypeOverride);
    }
  }, [contactsTypeOverride]);

  useEffect(() => {
    if (!vouchData || !trustData || isMobile) return;

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

    setSelectedContact(data[0]);
  }, [vouchData, trustData, contactsType, contactsTypeOverride, queryContact]);

  usePopTrustModal();

  const data = contactsType === ContactsType.TRUSTS_YOU ? vouchData : trustData;

  const isLoading = !data;

  const ContactDetailsVariant = isMobile
    ? withMobileView(ContactDetails)
    : ContactDetails;

  return (
    <>
      <Wrapper title={config.title} tabItems={config.tabItems}>
        <Card size="fluid" noGutter className="all-contacts-card">
          <Grid bordered>
            <Row nogutter>
              <Col sm={6} md={5} lg={4}>
                <Box fluid>
                  <ToggleMenu
                    fluid
                    items={config.toggleItems}
                    onChange={handleToggleContactType}
                    value={contactsType}
                  />
                </Box>
              </Col>
              <Col sm={6} md={7} lg={8} className="hide-lt-600">
                {selectedContact && (
                  <ContactDetailsHeader
                    {...selectedContact}
                    contactsType={contactsType}
                  />
                )}
              </Col>
            </Row>
            <Row noGutter>
              <Col
                sm={6}
                md={5}
                lg={4}
                noPadding
                className="contact-summary-col"
              >
                <div className="contact-summary-col-inner">
                  <Table noBorder noPadding mb="20px" disableCondensed>
                    {isLoading
                      ? createArray(3).map((_, i) => (
                          <ContactsSummaryRowSkeleton key={i} />
                        ))
                      : data.map((item, i) => (
                          <ContactsSummaryRow
                            {...item}
                            key={`${i}-${contactsType}`}
                            onClick={(_, data) => setSelectedContact(data)}
                          />
                        ))}
                  </Table>
                </div>

                <div className="contact-summary-vouch-buton">
                  <Box justify="center" mb="24px">
                    <Button
                      rounded
                      icon="vouch"
                      variant="floating"
                      label="Vouch for someone"
                      onClick={openVouchModal}
                    />
                  </Box>
                </div>
              </Col>
              <Col sm={6} md={7} lg={8}>
                {selectedContact && (
                  <ContactDetailsVariant
                    {...selectedContact}
                    contactsType={contactsType}
                    onClose={() => setSelectedContact(null)}
                  />
                )}
              </Col>
            </Row>
          </Grid>
        </Card>
      </Wrapper>

      {/* modals */}
      <VouchModalManager />
      {isManageContactModalOpen && (
        <ManageContactModal
          {...selectedContact}
          isLabelOnly={contactsType === ContactsType.TRUSTS_YOU}
        />
      )}
      {isEditAliasModalOpen && <EditAliasModal {...selectedContact} />}
      {isEditVouchModalOpen && <EditVouchModal {...selectedContact} />}
      {isWriteOffDebtModalOpen && <WriteOffDebtModal {...selectedContact} />}
    </>
  );
}
