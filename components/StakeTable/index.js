import Tooltip from "@reach/tooltip";
import TablePagination from "components/TablePagination";
import useIsMember from "hooks/useIsMember";
import useTrustCountData from "hooks/useTrustCountData";
import useTrustData from "hooks/useTrustData";
import { Fragment, useMemo, useState } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import Info from "svgs/Info";
import { healthTip } from "text/tooltips";
import { renderSortIcons } from "util/tables";
import Address from "../address";
import AddressModal from "../AddressModal";
import { useAddressModalToggle } from "../AddressModal/state";
import { useApplicationModalToggle } from "../ApplicationModal/state";
import Button from "../button";
import HealthBar from "../healthBar";
import { useLearnMoreModalToggle } from "../LearnMoreModal/state";
import Skeleton from "../Skeleton";
import { useTrustModalToggle } from "../TrustModal/state";

const StakeTableRowSkeleton = () => (
  <tr>
    <td>
      <div className="flex items-center" style={{ width: "12.1rem" }}>
        <Skeleton width={32} height={32} circle style={{ display: "block" }} />
        <Skeleton width={121} style={{ marginLeft: "1rem" }} />
      </div>
    </td>
    <td className="hidden sm:table-cell">
      <Skeleton width={85} />
    </td>
    <td className="hidden sm:table-cell">
      <Skeleton width={70} />
    </td>
    <td className="text-right">
      <Skeleton width={128} style={{ borderRadius: 2 }} />
    </td>
  </tr>
);

const StakeTableEmptyState = () => {
  const toggleLearnMoreModal = useLearnMoreModalToggle();
  const toggleTrustModal = useTrustModalToggle();
  const toggleApplicationModal = useApplicationModalToggle();

  const { data: isMember = false } = useIsMember();

  const { data: trustCount = 0 } = useTrustCountData();

  if (isMember)
    return (
      <div className="flex items-center flex-col my-6 md:mt-16 md:mb-12">
        <img src="/images/table-empty.svg" alt="" />
        <p className="text-lg md:text-xl text-center my-6 max-w-md">
          Now that you’re a member, pay it forward and vouch for someone you
          trust
        </p>
        <Button onClick={toggleTrustModal}>Trust a friend</Button>
      </div>
    );

  if (trustCount >= 3)
    return (
      <div className="flex items-center flex-col my-6 md:mt-16 md:mb-12">
        <img src="/images/table-empty.svg" alt="" />
        <p className="text-lg md:text-xl text-center my-6 max-w-md">
          Borrow without collateral and earn higher interest on your deposits if
          you are a member.
        </p>
        <Button onClick={toggleApplicationModal}>Become a member</Button>
      </div>
    );

  return (
    <div className="flex items-center flex-col my-6 md:mt-16 md:mb-12">
      <img src="/images/table-empty.svg" alt="" />
      <p className="text-lg md:text-xl text-center my-6 max-w-md">
        Borrow without collateral and earn higher interest on your deposits if
        you are a member.
      </p>
      <Button onClick={toggleLearnMoreModal}>Learn more</Button>
    </div>
  );
};

/**
 * @name renderTheadColumns
 * @param {import("react-table").ColumnInstance} column
 */
const renderTheadColumns = (column) => {
  const { Header } = column;

  if (Header === "Health")
    return (
      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
        <div className="flex items-center">
          <Tooltip label={healthTip}>
            <span className="flex items-center cursor-help">
              <div className="mr-2">
                <Info size={16} />
              </div>
              {column.render("Header")}
            </span>
          </Tooltip>
          <div className="ml-2">{renderSortIcons(column)}</div>
        </div>
      </th>
    );

  return (
    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
      <div className="flex items-center">
        {column.render("Header")}
        <div className="ml-2">{renderSortIcons(column)}</div>
      </div>
    </th>
  );
};

/**
 * @name renderTbodyCells
 * @param {import("react-table").Cell} cell
 * @param {array} memoizedData
 */
const renderTbodyCells = (cell, memoizedData) => {
  const {
    column: { Header },
    row: { values },
  } = cell;

  const cellData = memoizedData
    .filter(({ address }) => address === values.address)
    .pop();

  if (Header === "Address")
    return (
      <td {...cell.getCellProps()}>
        <Address address={cell.value} />
      </td>
    );

  if (Header === "Used" || Header === "Trust")
    return (
      <td className="hidden sm:table-cell" {...cell.getCellProps()}>
        <span>{cell.value} DAI</span>
      </td>
    );

  if (Header === "Health")
    return (
      <td {...cell.getCellProps()}>
        <HealthBar health={cell.value} isPoisoned={cellData.isOverdue} />
      </td>
    );

  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
};

const StakeTable = () => {
  const { data } = useTrustData();

  const toggleAddressModal = useAddressModalToggle();

  const [activeRow, activeRowSet] = useState();

  const handleRowClick = (row) => () => {
    const rowData = memoizedData
      .filter(({ address }) => address === row.values.address)
      .pop();

    activeRowSet(rowData);
    toggleAddressModal();
  };

  const memoizedColumns = useMemo(
    () => [
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Trust",
        accessor: "trust",
      },
      {
        Header: "Used",
        accessor: "used",
      },
      {
        Header: "Health",
        accessor: "health",
      },
    ],
    []
  );

  const memoizedData = useMemo(() => {
    if (data && data.length > 0) return data;
    return [];
  }, [data]);

  const memoizedSortBy = useMemo(() => [{ id: "health", desc: true }], []);

  const table = useTable(
    {
      columns: memoizedColumns,
      data: memoizedData,
      initialState: {
        sortBy: memoizedSortBy,
        pageIndex: 0,
        pageSize: 6,
      },
      disableSortRemove: true,
    },
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
  } = table;

  return (
    <div className="sm:bg-white sm:border sm:rounded sm:p-6 h-full flex flex-col">
      <table className="w-full border-none" {...getTableProps()}>
        <thead className="hidden sm:table-header-group">
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(renderTheadColumns)}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {data ? (
            page.map((row) => {
              prepareRow(row);
              return (
                // eslint-disable-next-line react/jsx-key
                <tr
                  {...row.getRowProps()}
                  className="cursor-pointer"
                  onClick={handleRowClick(row)}
                >
                  {row.cells.map((cell) =>
                    renderTbodyCells(cell, memoizedData)
                  )}
                </tr>
              );
            })
          ) : (
            <Fragment>
              <StakeTableRowSkeleton />
              <StakeTableRowSkeleton />
              <StakeTableRowSkeleton />
            </Fragment>
          )}
        </tbody>
      </table>

      {/* Spacer */}
      <div className="h-4 sm:h-6" />

      <TablePagination {...table} />

      {data && page.length === 0 && <StakeTableEmptyState />}

      {activeRow && <AddressModal {...activeRow} />}
    </div>
  );
};

export default StakeTable;
