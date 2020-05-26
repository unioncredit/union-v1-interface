import { useGetInvitedModalToggle } from "contexts/Application";
import { useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import Chevron from "svgs/Chevron";
import Info from "svgs/Info";
import { healthTip } from "text/tooltips";
import { toPercent } from "util/numbers";
import Address from "./address";
import Button from "./button";
import HealthBar from "./healthBar";

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
    <div className="bg-white border rounded p-4 sm:p-6 h-full">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className="flex items-center">
                    {column.Header === "Health" ? (
                      <span
                        className="flex items-center cursor-help"
                        title={healthTip}
                      >
                        <div className="mr-2">
                          <Info size={16} />
                        </div>
                        {column.render("Header")}
                      </span>
                    ) : (
                      column.render("Header")
                    )}
                    <div className="ml-2">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <Chevron.Down size={16} />
                        ) : (
                          <Chevron.Up size={16} />
                        )
                      ) : (
                        <Chevron.Down size={16} color="transparent" />
                      )}
                    </div>
                  </div>
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

                    if (Header === "Address")
                      cellRenderer = <Address address={value} copyable />;

                    if (Header === "Percentage")
                      cellRenderer = <span>{toPercent(value)}</span>;

                    if (Header === "Available Vouch" || Header === "Set Vouch")
                      cellRenderer = <span>{value} DAI</span>;

                    if (Header === "Health")
                      cellRenderer = <HealthBar health={value} />;

                    return <td {...getCellProps()}>{cellRenderer}</td>;
                  }
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {rows.length === 0 && (
        <div className="flex items-center flex-col my-6 md:mt-16 md:mb-12">
          <img src="/images/table-empty.svg" alt="" />
          <p className="text-lg md:text-xl text-center mt-6  mb-4 md:mb-6 max-w-md">
            You need 3 people to vouch for you
          </p>
          <Button onClick={toggleGetInvitedModal}>Get invited</Button>
        </div>
      )}
    </div>
  );
};

export default VouchTable;
