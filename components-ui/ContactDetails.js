import useBorrowData from "hooks/data/useBorrowData";
import { Stat, Grid, Card, Button, Badge } from "union-ui";
import { Dai } from "components-ui";
import format from "util/formatValue";
import { roundUp, toPercent } from "util/numbers";
import { useWeb3React } from "@web3-react/core";
import { RelatedHistory } from "./RelatedHistory";
import { ContactsType } from "constants/app";

import Manage from "union-ui/lib/icons/manage.svg";

function TrustsYouContactDetails({ used, utilized, vouched, manageContact }) {
  return (
    <>
      <Grid.Row>
        <Grid.Col xs={4}>
          <Stat label="Providing you" value={<Dai value={vouched} />} />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat label="Utilized" value={`${toPercent(utilized)}`} />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat
            label="Available"
            value={<Dai value={format(vouched - used)} />}
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
  utilized,
  vouched,
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
              <Badge
                color={isOverdue ? "red" : "blue"}
                label={isOverdue ? "Overdue" : "Healthy"}
              />
            }
          />
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col xs={4}>
          <Stat
            mb="12px"
            label="Credit Limit"
            value={<Dai value={vouched} />}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat mb="12px" label="Utilized" value={`${toPercent(utilized)}`} />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat
            mb="12px"
            label="Available"
            value={<Dai value={format(vouched - used)} />}
          />
        </Grid.Col>
        <Grid.Col xs={4}>
          <Stat label="Balance owed" value={<Dai value={format(used)} />} />
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
      <Card mb="24px" variant="packed">
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
