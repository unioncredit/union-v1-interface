import { useGetInvitedModalToggle } from "contexts/Application";
import { useMemo, Fragment } from "react";
import { useSortBy, useTable } from "react-table";
import Chevron from "svgs/Chevron";
import Info from "svgs/Info";
import { healthTip } from "text/tooltips";
import { toPercent } from "util/numbers";
import Address from "./address";
import Button from "./button";
import HealthBar from "./healthBar";

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
  if (column.Header === "Health")
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
const renderTbodyCells = ({
  getCellProps,
  render,
  value,
  column: { Header },
}) => {
  if (Header === "Address")
    return (
      <td {...getCellProps()}>
        <Address address={value} copyable />
      </td>
    );

  if (Header === "Percentage")
    return (
      <td {...getCellProps()}>
        <span>{toPercent(value)}</span>
      </td>
    );

  if (Header === "Available Vouch" || Header === "Set Vouch")
    return (
      <td className="hidden sm:table-cell" {...getCellProps()}>
        <span>{value} DAI</span>
      </td>
    );

  if (Header === "Health")
    return (
      <td className="hidden sm:table-cell" {...getCellProps()}>
        <HealthBar health={value} />
      </td>
    );

  return <td {...getCellProps()}>{render("Cell")}</td>;
};

const VouchTable = ({ data }) => {
  const toggleGetInvitedModal = useGetInvitedModalToggle();

  const memoizedColumns = useMemo(
    () => [
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
  } = useTable(
    {
      columns: memoizedColumns,
      data: memoizedData,
    },
    useSortBy
  );

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
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>{row.cells.map(renderTbodyCells)}</tr>
            );
          })}
        </tbody>
      </table>

      {rows.length === 0 && (
        <div className="flex items-center flex-col my-6 sm:mt-16 sm:mb-12">
          <img src="/images/table-empty.svg" alt="" />
          <p className="text-lg sm:text-xl text-center mt-6  mb-4 sm:mb-6 max-w-md">
            You need 3 people to vouch for you
          </p>
          <Button onClick={toggleGetInvitedModal}>Get invited</Button>
        </div>
      )}
    </div>
  );
};

export default VouchTable;
