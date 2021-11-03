import { Grid, Table, Card, Pagination, Box } from "union-ui";
import Link from "next/link";
import {
  View,
  CreditContactsRow,
  OutstandingLoans,
  CreditContactsRowSkeleton,
  LendStatsCard,
  NewVouchCard,
} from "components-ui";
import useTrustData from "hooks/data/useTrustData";
import createArray from "util/createArray";

import { config } from "./config";
import { ContactsType } from "constants/app";
import usePagination from "hooks/usePagination";

export default function LendView() {
  const { data: trustData } = useTrustData();

  const {
    data: pagedTrustData,
    maxPages,
    page,
    setPage,
  } = usePagination(trustData);

  const isTrustLoading = !trustData;

  return (
    <View tabItems={config.tabItems}>
      <Grid>
        <Grid.Row justify="center">
          <Grid.Col>
            <Box mt="24px">
              <LendStatsCard />
            </Box>

            <NewVouchCard />

            <Card mt="24px">
              <Card.Header
                title="Active Borrowers"
                subTitle="Contacts actively borrowing from your stake"
              />
              <Card.Body>
                <OutstandingLoans data={trustData} />
              </Card.Body>
            </Card>

            <Card mt="24px">
              <Card.Header
                title="Contacts you trust"
                subTitle="Accounts you’re providing credit to"
              />
              <Card.Body>
                <Table>
                  {isTrustLoading
                    ? createArray(3).map((_, i) => (
                        <CreditContactsRowSkeleton key={i} />
                      ))
                    : pagedTrustData.map((item) => (
                        <Link
                          key={item.address}
                          href={`/contacts/${ContactsType.YOU_TRUST}?contact=${item.address}`}
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
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </View>
  );
}
