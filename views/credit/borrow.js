import {
  Wrapper,
  TransactionHistory,
  CreditContactsRow,
  CreditContactsRowSkeleton,
  BorrowStatsCard,
  ShareCard,
} from "components-ui";
import { Grid, Row, Col, Table, Card, Box, Pagination } from "union-ui";
import Link from "next/link";
import useVouchData from "hooks/data/useVouchData";
import createArray from "util/createArray";
import { ContactsType } from "../contacts/config";

import { config } from "./config";
import usePagination from "hooks/usePagination";

export default function BorrowView() {
  const { data: vouchData } = useVouchData(8);

  const {
    data: pagedVouchData,
    page,
    maxPages,
    setPage,
  } = usePagination(vouchData);

  const isVouchLoading = !vouchData;

  return (
    <Wrapper title={config.title} tabItems={config.tabItems}>
      <Grid>
        <Row justify="center">
          <Col xs={6}>
            <Box mt="24px">
              <BorrowStatsCard />
            </Box>
            <Card mt="24px">
              <Card.Header
                title="Credit providers"
                subTitle="Accounts providing you with credit"
              />
              <Card.Body>
                <Table disableCondensed>
                  {isVouchLoading
                    ? createArray(3).map((_, i) => (
                        <CreditContactsRowSkeleton key={i} />
                      ))
                    : pagedVouchData.slice(0, 8).map((item) => (
                        <Link
                          key={item.address}
                          href={`/contacts?contactsType=${ContactsType.TRUSTS_YOU}&contact=${item.address}`}
                        >
                          <CreditContactsRow {...item} />
                        </Link>
                      ))}
                </Table>
                <Pagination
                  mt="18px"
                  pages={maxPages}
                  activePage={page}
                  onClick={setPage}
                />
              </Card.Body>
            </Card>
            <ShareCard />
            <Card mt="24px">
              <Card.Header
                title="Transaction History"
                subTitle="Your credit based transaction history"
              />
              <Card.Body>
                <TransactionHistory />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Grid>
    </Wrapper>
  );
}
