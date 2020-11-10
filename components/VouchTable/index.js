import Tooltip from "@reach/tooltip";
import { useAutoCallback } from "hooks.macro";
import { Fragment, useMemo } from "react";
import { useExpanded, useSortBy, useTable } from "react-table";
import Chevron from "svgs/Chevron";
import Info from "svgs/Info";
import { utilizedVouchTip } from "text/tooltips";
import { renderSortIcons } from "util/tables";
import Address from "../Address";
import Button from "../button";
import { useGetInvitedModalToggle } from "../modals/GetInvitedModal/state";
import PercentageBar from "../percentageBar";
import Skeleton from "../Skeleton";

const VouchTableRowSkeleton = () => (
  <tr>
    <td>
      <div className="flex items-center" style={{ width: "11rem" }}>
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
    <td className="hidden sm:table-cell text-right">
      <Skeleton style={{ borderRadius: 2 }} />
    </td>
  </tr>
);

const VouchTableEmptyState = () => {
  const toggleGetInvitedModal = useGetInvitedModalToggle();

  return (
    <div className="flex items-center flex-col my-6 sm:mt-16 sm:mb-12">
      <img src="/images/table-empty.svg" alt="" />
      <p className="text-lg sm:text-xl text-center mt-6  mb-4 sm:mb-6 max-w-md">
        You need 3 people to vouch for you
      </p>
      <Button onClick={toggleGetInvitedModal}>Get invited</Button>
    </div>
  );
};

/**
 * @name renderTheadColumns
 * @param {import("react-table").ColumnInstance} column
 */
const renderTheadColumns = (column) => {
  const { Header, id } = column;

  if (id === "expander")
    return (
      <th
        className="sm:hidden"
        {...column.getHeaderProps(column.getSortByToggleProps())}
      >
        {column.render("Header")}
      </th>
    );

  if (Header === "Utilized")
    return (
      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
        <div className="flex items-center">
          <Tooltip label={utilizedVouchTip}>
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
 */
const renderTbodyCells = (cell) => {
  const {
    column: { Header },
    row: { index },
  } = cell;

  if (Header === "Address")
    return (
      <td {...cell.getCellProps()}>
        <Address address={cell.value} copyable />
      </td>
    );

  if (Header === "Utilized")
    return (
      <td {...cell.getCellProps()}>
        <PercentageBar
          value={cell.value}
          index={index}
          className="ml-auto sm:justify-end"
        />
      </td>
    );

  if (Header === "Available Vouch" || Header === "Set Vouch")
    return (
      <td className="hidden sm:table-cell" {...cell.getCellProps()}>
        <span>{cell.value} DAI</span>
      </td>
    );

  if (cell.column.id === "expander")
    return (
      <td className="w-8 sm:hidden" {...cell.getCellProps()}>
        {cell.render("Cell")}
      </td>
    );

  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
};

const VouchTable = ({ data }) => {
  const memoizedColumns = useMemo(
    () => [
      {
        Header: () => null,
        id: "expander",
        Cell: ({ row }) => (
          <button
            className="h-6 w-6 ml-0 my-1 mr-3 flex items-center justify-center focus:outline-none focus:shadow-outline rounded"
            {...row.getToggleRowExpandedProps()}
          >
            {row.isExpanded ? (
              <Chevron.Down size={16} />
            ) : (
              <Chevron.Right size={16} />
            )}
          </button>
        ),
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Set Vouch",
        accessor: "vouched",
      },
      {
        Header: "Available Vouch",
        accessor: "available",
      },
      {
        Header: "Utilized",
        accessor: "utilized",
      },
    ],
    []
  );

  const memoizedData = useMemo(() => {
    if (data && data.length > 0)
      return data.sort((a, b) => b.vouched - a.vouched);
    return [];
  }, [data]);

  const memoizedSortBy = useMemo(() => [{ id: "utilized", desc: true }], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = useTable(
    {
      columns: memoizedColumns,
      data: memoizedData,
      initialState: {
        sortBy: memoizedSortBy,
      },
      disableSortRemove: true,
    },
    useSortBy,
    useExpanded
  );

  const renderRowSubComponent = useAutoCallback((row) => {
    const { vouched, available } = row.values;

    return (
      <div className="bg-border-light text-type-light -m-4 px-4 py-3">
        <ul className="ml-10 space-y-3">
          <li className="h-5 leading-tight flex justify-between items-center">
            <p className="text-sm">Vouched</p>
            <p>{Number(vouched).toFixed()} DAI</p>
          </li>
          <li className="h-5 leading-tight flex justify-between items-center">
            <p className="text-sm">Available</p>
            <p>{Number(available).toFixed()} DAI</p>
          </li>
        </ul>
      </div>
    );
  });

  return (
    <div className="sm:bg-white sm:border sm:rounded sm:p-6 h-full">
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
            rows.map((row) => {
              prepareRow(row);
              return (
                // eslint-disable-next-line react/jsx-key
                <Fragment {...row.getRowProps()}>
                  <tr>{row.cells.map(renderTbodyCells)}</tr>
                  {row.isExpanded ? (
                    <tr>
                      <td colSpan={visibleColumns.length}>
                        {renderRowSubComponent(row)}
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })
          ) : (
            <Fragment>
              <VouchTableRowSkeleton />
              <VouchTableRowSkeleton />
              <VouchTableRowSkeleton />
              <VouchTableRowSkeleton />
              <VouchTableRowSkeleton />
            </Fragment>
          )}
        </tbody>
      </table>

      {data && rows.length === 0 && <VouchTableEmptyState />}
    </div>
  );
};

export default VouchTable;
