import useBorrowData from "hooks/data/useBorrowData";
import { Stat, Grid, Card, Button, Badge } from "@unioncredit/ui";
import { Dai } from "components-ui";
import format from "util/formatValue";
import { roundUp } from "util/numbers";
import { useWeb3React } from "@web3-react/core";
import { RelatedHistory } from "./RelatedHistory";
import { ContactsType } from "constants/app";

import Manage from "@unioncredit/ui/lib/icons/manage.svg";

function TrustsYouContactDetails({ trust, vouched, manageContact, available }) {
  return (
    <>
      <Grid.Row>
        <Grid.Col xs={4}>
          <Stat
            label="Trust"
            tooltip="The DAI amount this address trusts you with"
            value={<Dai value={format(trust, 2)} />}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat
            label="Vouch"
            tooltip="The DAI amount this address can underwrite based on their total staked DAI"
            value={<Dai value={format(vouched, 2)} />}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat
            label="Available"
            tooltip="The DAI amount you can borrow from this address"
            value={<Dai value={format(available, 2)} />}
          />
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col xs={12}>
          <Button
            mt="18px"
            fluid
            label="Manage Contact"
            icon={Manage}
            onClick={manageContact}
          />
        </Grid.Col>
      </Grid.Row>
    </>
  );
}

function YouTrustContactDetails({
  manageContact,
  address,
  used,
  vouched,
  trust,
  isMember,
  isOverdue,
}) {
  const { data: borrowData } = useBorrowData(address);

  const { interest = 0, paymentDueDate = "-" } = !!borrowData && borrowData;

  return (
    <>
      <Grid.Row>
        <Grid.Col>
          <Stat
            mb="24px"
            label="Credit Status"
            value={
              isMember ? (
                <Badge
                  color={isOverdue ? "red" : "blue"}
                  label={isOverdue ? "Overdue" : "Healthy"}
                />
              ) : (
                <Badge color="grey" label="Not a member" />
              )
            }
          />
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col xs={4}>
          <Stat
            mb="12px"
            label="Trust"
            tooltip="The DAI amount you trust this address to borrow"
            value={<Dai value={format(trust, 2)} />}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat
            mb="12px"
            label="Vouch"
            tooltip="The DAI amount you can underwrite based on your total staked DAI"
            value={<Dai value={format(vouched, 2)} />}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat
            mb="12px"
            label="Available"
            tooltip="The DAI this address has available to borrow"
            value={<Dai value={format(vouched - used, 2)} />}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat label="Balance owed" value={<Dai value={format(used, 2)} />} />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat label="Min payment" value={<Dai value={roundUp(interest)} />} />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat
            label="Payment due"
            value={
              paymentDueDate === "No Payment Due" ? "None" : paymentDueDate
            }
          />
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col xs={12}>
          <Button
            mt="18px"
            fluid
            variant="secondary"
            label="Manage Contact"
            icon={Manage}
            onClick={manageContact}
          />
        </Grid.Col>
      </Grid.Row>
    </>
  );
}

export function ContactDetails({ contactsType, ...props }) {
  const { account } = useWeb3React();

  const relatedHistoryProps =
    contactsType === ContactsType.TRUSTS_YOU
      ? { account: props.address, staker: props.address, borrower: account }
      : { account: props.address, staker: account, borrower: props.address };

  return (
    <>
      <Card mb="24px">
        <Card.Body>
          <Grid>
            {contactsType === ContactsType.YOU_TRUST ? (
              <YouTrustContactDetails {...props} />
            ) : (
              <TrustsYouContactDetails {...props} />
            )}
          </Grid>
        </Card.Body>
      </Card>
      <RelatedHistory {...relatedHistoryProps} />
    </>
  );
}
