import { useGetInvitedModalToggle } from "@contexts/Application";
import { useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import Address from "./address";
import Button from "./button";
import HealthBar from "./healthBar";

const StakeTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Vouched",
        accessor: "vouched",
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  const toggleGetInvitedModal = useGetInvitedModalToggle();

  return (
    <div className="bg-white border rounded p-4 md:p-6 h-full">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
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
        <div className="flex items-center flex-col mt-16">
          <div className="w-24 h-40 bg-border-pure" />
          <p className="text-xl text-center my-6 max-w-md">
            Borrow without collateral and earn higher interest on your deposits
          </p>
          <p className="text-center">
            <Button onClick={toggleGetInvitedModal}>Become a member</Button>
          </p>
        </div>
      )}
    </div>
  );
};

export default StakeTable;
