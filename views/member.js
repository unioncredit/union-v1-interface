import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import Chevron from "svgs/Chevron";
import Address from "../components/address";
import { useAutoCallback, useAutoEffect } from "hooks.macro";
import useAllMemberInfo from "hooks/useAllMemberInfo";
import { Fragment, useMemo, useState } from "react";
import { useSortBy, useTable } from "react-table";

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
  const { Header } = column;

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

  if (Header === "Address" && cell.value)
    return (
      <td {...cell.getCellProps()}>
        <Address address={cell.value} />
      </td>
    );

  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
};

export default function AdminView() {
  const { data } = useAllMemberInfo();

  const memoizedColumns = useMemo(
    () => [
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "TotalCreditLimit",
        accessor: "totalCreditLimit",
      },
      {
        Header: "AvailableCreditLimit",
        accessor: "availableCreditLimit",
      },
      {
        Header: "",
        accessor: "action",
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
      { id: "address", desc: true },
      { id: "totalCreditLimit", desc: true },
      { id: "availableCreditLimit", desc: true },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns: memoizedColumns,
      data: memoizedData,
      initialState: {
        sortBy: memoizedSortBy,
      },
      disableSortRemove: true,
    },
    useSortBy
  );

  return (
    <Fragment>
      <div className="container">
        <div className="mb-5">
          <h1>Total member: {data ? data.length : "-"}</h1>
        </div>
        <div className="mb-5">
          <h1>Member</h1>
        </div>
        <div className="mb-6">
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
                  <tr
                    {...row.getRowProps()}
                    className="focus:outline-none cursor-pointer"
                    tabIndex={0}
                  >
                    {row.cells.map(renderTbodyCells)}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}
