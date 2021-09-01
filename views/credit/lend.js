import {
  Stats,
  Stat,
  Button,
  Bar,
  Grid,
  Row,
  Col,
  Heading,
  Text,
  Table,
  TableRow,
  TableCell,
} from "union-ui";
import Link from "next/link";
import format from "util/formatValue";
import { roundDown, toPercent } from "util/numbers";
import useStakeData from "hooks/data/useStakeData";
import {
  Dai,
  Wrapper,
  ContactsSummaryRow,
  OutstandingLoans,
  ContactsSummaryRowSkeleton,
} from "components-ui";
import {
  useStakeModal,
  StakeModal,
  useVouchModal,
  VouchModalManager,
} from "components-ui/modals";
import useTrustData from "hooks/data/useTrustData";
import createArray from "util/createArray";

import { config } from "./config";
import { useState } from "react";
import { ContactsType } from "views/contacts/config";

export default function LendView() {
  const [stakeType, setStakeType] = useState("deposit");
  const { data: stakeData } = useStakeData();
  const { data: trustData } = useTrustData(8);

  const { open: openVouchModal } = useVouchModal();
  const { isOpen: isStakeModalOpen, open: openStakeModal } = useStakeModal();

  const isTrustLoading = !trustData;

  const {
    totalStake = 0.0,
    utilizedStake = 0.0,
    defaultedStake = 0.0,
    withdrawableStake = 0.0,
  } = !!stakeData && stakeData;

  const percentageStake = utilizedStake / totalStake;

  const handleOpenStakeModal = (type) => () => {
    setStakeType(type);
    openStakeModal();
  };

  return (
    <>
      <Wrapper title={config.title} tabItems={config.tabItems}>
        <Grid>
          <Row>
            <Col>
              <Stats
                buttons={[
                  <Button
                    icon="vouch"
                    label="Vouch for new contact"
                    key="vouch-new-contact"
                    onClick={openVouchModal}
                  />,
                ]}
              >
                <Stat
                  label="Staked"
                  value={<Dai value={format(roundDown(totalStake))} />}
                  cta={
                    <Button
                      variant="pill"
                      icon="chevron"
                      iconPosition="end"
                      label="Adjust stake"
                      onClick={handleOpenStakeModal("deposit")}
                    />
                  }
                />
                <Stat
                  label="Utilized"
                  value={<Dai value={format(roundDown(utilizedStake))} />}
                  caption={
                    <Bar
                      label={toPercent(percentageStake)}
                      percentage={percentageStake * 100}
                    />
                  }
                />
                <Stat
                  label="Withdrawable"
                  value={<Dai value={format(roundDown(withdrawableStake))} />}
                  cta={
                    <Button
                      variant="pill"
                      icon="chevron"
                      iconPosition="end"
                      label="Withdraw"
                      onClick={handleOpenStakeModal("withdraw")}
                    />
                  }
                />
                <Stat
                  label="Defaulted"
                  value={<Dai value={format(roundDown(defaultedStake))} />}
                />
              </Stats>
            </Col>
          </Row>

          <Row>
            <Col md={6} lg={4}>
              <Heading level={2} mt="40px">
                Contacts you trust
              </Heading>
              <Text mb="12px">Accounts you’re providing credit to</Text>
              <Table>
                {isTrustLoading
                  ? createArray(3).map((_, i) => (
                      <ContactsSummaryRowSkeleton key={i} />
                    ))
                  : trustData.slice(0, 8).map((item) => (
                      <Link
                        key={item.address}
                        href={`/contacts?contactsType=${ContactsType.YOU_TRUST}&contact=${item.address}`}
                      >
                        <ContactsSummaryRow {...item} valueCaption="Trust" />
                      </Link>
                    ))}
                <TableRow>
                  <TableCell />
                  <TableCell align="right" span={1}>
                    <Link href="/contacts">
                      <Button
                        inline
                        label="All contacts"
                        variant="pill"
                        icon="chevron"
                        iconPosition="end"
                      />
                    </Link>
                  </TableCell>
                </TableRow>
              </Table>
            </Col>
            <Col md={6} lg={8}>
              <Heading level={2} mt="40px">
                Outstanding Loans
              </Heading>
              <Text mb="12px">Outstanding debt from contacts you trust</Text>
              <OutstandingLoans data={trustData} />
            </Col>
          </Row>
        </Grid>
      </Wrapper>
      <VouchModalManager />
      {isStakeModalOpen && <StakeModal type={stakeType} />}
    </>
  );
}
``;
