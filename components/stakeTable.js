import { useLearnMoreModalToggle } from "contexts/Application";
import { useAddressModalToggle, useTrustModalToggle } from "contexts/Stake";
import { useAutoCallback } from "hooks.macro";
import useIsMember from "hooks/useIsMember";
import useTrustData from "hooks/useTrustData";
import { Fragment, useMemo, useState } from "react";
import { useExpanded, useSortBy, useTable } from "react-table";
import Chevron from "svgs/Chevron";
import Info from "svgs/Info";
import { healthTip } from "text/tooltips";
import Address from "./address";
import AddressModal from "./addressModal";
import Button from "./button";
import HealthBar from "./healthBar";

const StakeTableEmptyState = () => {
  const toggleLearnMoreModal = useLearnMoreModalToggle();

  const toggleTrustModal = useTrustModalToggle();

  const { data: isMember = false } = useIsMember();

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

  return (
    <div className="flex items-center flex-col my-6 md:mt-16 md:mb-12">
      <img src="/images/table-empty.svg" alt="" />
      <p className="text-lg md:text-xl text-center my-6 max-w-md">
        Borrow without collateral and earn higher interest on your deposits if
        you are a member.
      </p>
      <Button onClick={toggleLearnMoreModal}>Become a member</Button>
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
  } = cell;

  if (Header === "Address")
    return (
      <td {...cell.getCellProps()}>
        <Address address={cell.value} withLabel />
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
    if (!!(data && data.length > 0)) return data;
    return [];
  }, [data]);

  const memoizedSortBy = useMemo(
    () => [
      { id: "expander", desc: true },
      { id: "address", desc: true },
      { id: "trust", desc: true },
      { id: "used", desc: true },
      { id: "health", desc: true },
    ],
    []
  );

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
    const { vouched, used } = row.values;

    return (
      <div className="bg-border-light text-type-light -m-4 px-4 py-3">
        <ul className="ml-10">
          <li className="h-5 leading-tight flex justify-between items-center mb-3">
            <p className="text-sm">Vouched</p>
            <p>{Number(vouched).toFixed()} DAI</p>
          </li>
          <li className="h-5 leading-tight flex justify-between items-center">
            <p className="text-sm">Used</p>
            <p>{Number(used).toFixed()} DAI</p>
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
                <tr
                  className="focus:outline-none cursor-pointer"
                  onClick={handleRowClick(row)}
                  tabIndex={0}
                >
                  {row.cells.map(renderTbodyCells)}
                </tr>
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

      {rows.length === 0 && <StakeTableEmptyState />}

      {activeRow && <AddressModal {...activeRow} />}
    </div>
  );
};

export default StakeTable;
