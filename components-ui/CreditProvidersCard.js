import { CreditContactsRow, CreditContactsRowSkeleton } from "components-ui";
import { Table, Card, Pagination, EmptyState } from "union-ui";
import Link from "next/link";
import useVouchData from "hooks/data/useVouchData";
import createArray from "util/createArray";
import { ContactsType } from "constants/app";

import usePagination from "hooks/usePagination";

export function CreditProvidersCard() {
  const { data: vouchData } = useVouchData();

  const {
    data: pagedVouchData,
    page,
    maxPages,
    setPage,
  } = usePagination(vouchData);

  const isVouchLoading = !vouchData;

  return (
    <Card>
      <Card.Header
        title="Credit providers"
        subTitle="Accounts providing you with credit"
      />
      <Card.Body>
        {pagedVouchData.length <= 0 ? (
          <EmptyState label="No credit providers" />
        ) : (
          <Table disableCondensed>
            {isVouchLoading
              ? createArray(3).map((_, i) => (
                  <CreditContactsRowSkeleton key={i} />
                ))
              : pagedVouchData.map((item) => (
                  <Link
                    key={item.address}
                    href={`/contacts?contactsType=${ContactsType.TRUSTS_YOU}&contact=${item.address}`}
                  >
                    <CreditContactsRow {...item} />
                  </Link>
                ))}
          </Table>
        )}
        <Pagination
          mt="18px"
          pages={maxPages}
          activePage={page}
          onClick={setPage}
        />
      </Card.Body>
    </Card>
  );
}
