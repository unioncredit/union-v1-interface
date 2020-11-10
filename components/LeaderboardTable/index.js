import TablePagination from "components/TablePagination";
import { Fragment, useMemo } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import { renderSortIcons } from "util/tables";
import Address from "../Address";
import Skeleton from "../Skeleton";

const LeaderboardTableRowSkeleton = () => (
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
      <Skeleton width={128} />
    </td>
  </tr>
);

/**
 * @name renderTheadColumns
 * @param {import("react-table").ColumnInstance} column
 */
const renderTheadColumns = (column) => {
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
 */
const renderTbodyCells = (cell) => {
  const {
    column: { Header },
  } = cell;

  if (Header === "Address")
    return (
      <td {...cell.getCellProps()}>
        <Address address={cell.value} />
      </td>
    );

  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
};

/**
 * @name renderTbodyRows
 */
const renderTbodyRows = (prepareRow) => (row) => {
  prepareRow(row);

  return <tr {...row.getRowProps()}>{row.cells.map(renderTbodyCells)}</tr>;
};

const LeaderboardTable = ({ disablePagination = false }) => {
  const data = useMemo(() => {
    return new Array(48).fill({
      address: "0xf6fDeE29e3A14610fdbE187e2d3442543cfA45B8",
      votes: "100",
      voteWeight: "10%",
      proposalsVoted: "10",
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Votes",
        accessor: "votes",
      },
      {
        Header: "Vote weight",
        accessor: "voteWeight",
      },
      {
        Header: "Proposals voted",
        accessor: "proposalsVoted",
      },
    ],
    []
  );

  const memoizedSortBy = useMemo(() => [{ id: "health", desc: true }], []);

  const table = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: memoizedSortBy,
        pageIndex: 0,
        pageSize: disablePagination ? data.length : 5,
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
            page.map(renderTbodyRows(prepareRow))
          ) : (
            <Fragment>
              <LeaderboardTableRowSkeleton />
              <LeaderboardTableRowSkeleton />
              <LeaderboardTableRowSkeleton />
              <LeaderboardTableRowSkeleton />
              <LeaderboardTableRowSkeleton />
            </Fragment>
          )}
        </tbody>
      </table>

      <TablePagination {...table} />
    </div>
  );
};

export default LeaderboardTable;
