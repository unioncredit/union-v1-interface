import {
  Stats,
  Stat,
  Button,
  Bar,
  ButtonRow,
  Grid,
  Row,
  Col,
  Box,
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
        <Stats mb="40px">
          <Box minw="65%">
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
          </Box>
          <ButtonRow direction="vertical">
            <Button
              icon="vouch"
              label="Vouch for new contact"
              onClick={openVouchModal}
            />
          </ButtonRow>
        </Stats>
        <Grid>
          <Row>
            <Col md={4}>
              <Heading level={2}>Contacts you trust</Heading>
              <Text mb="12px">Accounts you’re providing credit to</Text>
              <Table>
                {isTrustLoading
                  ? createArray(3).map((_, i) => (
                      <ContactsSummaryRowSkeleton key={i} />
                    ))
                  : trustData.map((item, i) => (
                      <ContactsSummaryRow {...item} key={i} />
                    ))}
                <TableRow>
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
            <Col md={8}>
              <Heading level={2}>Outstanding Loans</Heading>
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
