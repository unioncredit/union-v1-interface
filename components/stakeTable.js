import { useGetInvitedModalToggle } from "@contexts/Application";
import useCurrentToken from "@hooks/useCurrentToken";
import { getTrust } from "@lib/contracts/getTrust";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useMemo, useState } from "react";
import { useSortBy, useTable } from "react-table";
import Address from "./address";
import Button from "./button";
import HealthBar from "./healthBar";

const StakeTable = () => {
  const { library, account, chainId } = useWeb3React();

  const curToken = useCurrentToken();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (library && account) {
      getTrustData();
    }
  }, [library, account, chainId]);

  const getTrustData = async () => {
    try {
      const res = await getTrust(account, curToken, library, chainId);
      setData(res);
    } catch (err) {
      console.error(err);
    }
  };

  const memoizedColumns = useMemo(
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

  const memoizedData = useMemo(() => data, [data]);

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

  const toggleGetInvitedModal = useGetInvitedModalToggle();

  return (
    <div className="bg-white border rounded p-4 sm:p-6 h-full">
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
        <div className="flex items-center flex-col my-6 md:mt-16 md:mb-12">
          <div className="w-24 h-40 bg-border-pure" />
          <p className="text-lg md:text-xl text-center mt-6  mb-4 md:mb-6 max-w-md">
            Borrow without collateral and earn higher interest on your deposits
            if you are a member.
          </p>
          <p className="text-center">
            <Button
              className="hidden md:inline-block"
              onClick={toggleGetInvitedModal}
            >
              Become a member
            </Button>
            <button
              onClick={toggleGetInvitedModal}
              className="underline font-semibold"
            >
              Learn more
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default StakeTable;
