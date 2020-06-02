import { useGetInvitedModalToggle } from "contexts/Application";
import { Fragment, useMemo } from "react";
import { useSortBy, useTable, useExpanded } from "react-table";
import Chevron from "svgs/Chevron";
import Info from "svgs/Info";
import { healthTip } from "text/tooltips";
import Address from "./address";
import Button from "./button";
import HealthBar from "./healthBar";
import PercentageBar from "./percentageBar";
import { useAutoCallback } from "hooks.macro";

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
 * @name renderHeadRowSorting
 * @param {import("react-table").ColumnInstance} column
 */
const renderSortIcons = (column) => (
  <Fragment>
    {column.isSorted ? (
      column.isSortedDesc ? (
        <Chevron.Down size={16} />
      ) : (
        <Chevron.Up size={16} />
      )
    ) : (
      <Chevron.Down size={16} color="transparent" />
    )}
  </Fragment>
);

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

  if (Header === "Health")
    return (
      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
        <div className="flex items-center">
          <span className="flex items-center cursor-help" title={healthTip}>
            <div className="mr-2">
              <Info size={16} />
            </div>
            {column.render("Header")}
          </span>
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

  if (Header === "Percentage")
    return (
      <td {...cell.getCellProps()}>
        <PercentageBar value={cell.value} index={index} />
      </td>
    );

  if (Header === "Available Vouch" || Header === "Set Vouch")
    return (
      <td className="hidden sm:table-cell" {...cell.getCellProps()}>
        <span>{cell.value} DAI</span>
      </td>
    );

  if (Header === "Health")
    return (
      <td className="hidden sm:table-cell" {...cell.getCellProps()}>
        <HealthBar health={cell.value} />
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
        Header: "Percentage",
        accessor: "percentage",
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
        Header: "Health",
        accessor: "health",
      },
    ],
    []
  );

  const memoizedData = useMemo(() => {
    if (!!(data && data.length > 0)) return data;
    return [];
  }, [data]);

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
    },
    useSortBy,
    useExpanded
  );

  const renderRowSubComponent = useAutoCallback((row) => {
    const { vouched, available, health } = row.values;

    return (
      <div className="bg-border-light text-type-light -m-4 px-4 py-3">
        <ul className="ml-10">
          <li className="h-5 leading-tight flex justify-between items-center mb-3">
            <p className="text-sm">Vouched</p>
            <p>{Number(vouched).toFixed()} DAI</p>
          </li>
          <li className="h-5 leading-tight flex justify-between items-center mb-3">
            <p className="text-sm">Available</p>
            <p>{Number(available).toFixed()} DAI</p>
          </li>
          <li className="h-5 leading-tight flex justify-between items-center">
            <p className="text-sm">Health</p>
            <HealthBar health={health} />
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
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(renderTheadColumns)}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
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
          })}
        </tbody>
      </table>

      {rows.length === 0 && <VouchTableEmptyState />}
    </div>
  );
};

export default VouchTable;
