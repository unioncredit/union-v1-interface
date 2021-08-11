import {
  Button,
  Heading,
  Text,
  Box,
  Card,
  Grid,
  Row,
  Col,
  Stat,
  ToggleMenu,
  Label,
  Badge,
  Table,
} from "union-ui";
import {
  Wrapper,
  Avatar,
  ContactDetails,
  ContactsSummaryRow,
  ContactsSummaryRowSkeleton,
} from "components-ui";
import {
  useVouchModal,
  VouchModal,
  useManageContactModal,
  ManageContactModal,
} from "components-ui/modals";
import { useState } from "react";
import useTrustData from "hooks/data/useTrustData";
import useVouchData from "hooks/data/useVouchData";
import createArray from "util/createArray";

import { config, ContactsType } from "./config";

export default function ContactsView() {
  const [contactsType, setContactsType] = useState(ContactsType.TRUSTS_YOU);
  const [selectedContact, setSelectedContact] = useState(null);
  const { isOpen: isVouchModalOpen, open: openVouchModal } = useVouchModal();
  const { isOpen: isManageContactModalOpen, open: openManageContactModal } =
    useManageContactModal();

  const { data: trustData } = useTrustData();
  const { data: vouchData } = useVouchData();

  const handleToggleContactType = (item) => {
    setSelectedContact(null);
    setContactsType(item.id);
  };

  const data = contactsType === ContactsType.TRUSTS_YOU ? vouchData : trustData;

  const isLoading = !data;

  return (
    <>
      <Wrapper title={config.title} tabItems={config.tabItems}>
        <Card size="fluid" noGutter>
          <Grid bordered>
            <Row nogutter>
              <Col md={4}>
                <Box>
                  <ToggleMenu
                    items={config.toggleItems}
                    onChange={handleToggleContactType}
                  />
                </Box>
              </Col>
              <Col>
                <Box align="center">
                  {selectedContact && (
                    <Avatar size={54} address={selectedContact.address} />
                  )}
                  <Box direction="vertical" mx="16px">
                    <Heading level={2}>{selectedContact?.name}</Heading>
                    <Text mb={0}>{selectedContact?.address}</Text>
                  </Box>
                  <Button
                    ml="auto"
                    rounded
                    variant="secondary"
                    label="Manage contact"
                    icon="manage"
                    onClick={openManageContactModal}
                  />
                </Box>
              </Col>
            </Row>
            <Row noGutter>
              <Col md={4} noPadding>
                <Table noBorder noPadding mb="20px">
                  {isLoading
                    ? createArray(3).map((_, i) => (
                        <ContactsSummaryRowSkeleton key={i} />
                      ))
                    : data.map((item, i) => (
                        <ContactsSummaryRow
                          {...item}
                          key={i}
                          onClick={setSelectedContact}
                        />
                      ))}
                </Table>

                <Box mt="auto" mb="24px" ml="auto" mr="auto">
                  <Button
                    rounded
                    icon="vouch"
                    variant="floating"
                    label="Vouch for someone"
                    onClick={openVouchModal}
                  />
                </Box>
              </Col>
              <Col md={8}>
                {selectedContact && (
                  <ContactDetails variant={contactsType} {...selectedContact} />
                )}
              </Col>
            </Row>
          </Grid>
        </Card>
      </Wrapper>
      {isVouchModalOpen && <VouchModal />}
      {isManageContactModalOpen && <ManageContactModal />}
    </>
  );
}
