import Link from "next/link";
import { useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import Address from "./address";
import HealthBar from "./healthBar";

const StakeTable = ({
  columns = useMemo(
    () => [
      {
        Header: "Address",
        accessor: "address"
      },
      {
        Header: "Vouched",
        accessor: "vouched"
      },
      {
        Header: "Used",
        accessor: "used"
      },
      {
        Header: "Health",
        accessor: "health"
      }
    ],
    []
  ),
  data
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  );

  return (
    <div className="bg-white border rounded p-4 md:p-6 h-full">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : " ⏺"}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(
                  ({ getCellProps, render, value, column: { Header } }) => {
                    let cellRenderer = render("Cell");

                    if (Header === "Health")
                      cellRenderer = <HealthBar health={value} />;

                    if (Header === "Address")
                      cellRenderer = <Address address={value} />;

                    if (Header === "Used" || Header === "Vouched")
                      cellRenderer = <span>{value} DAI</span>;

                    return <td {...getCellProps()}>{cellRenderer}</td>;
                  }
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {rows.length === 0 && (
        <div className="flex items-center flex-col h-full">
          <div className="mt-8 h-40 bg-primary-500 w-24" />
          <p className="text-xl text-center my-6 max-w-md">
            Borrow without collateral and earn higher interest on your deposits
            if you are a member.
          </p>
          <Link href="/vouch">
            <a className="btn btn-primary">Become a member</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default StakeTable;
