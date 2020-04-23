import { useLearnMoreModalToggle } from "@contexts/Application";
import useCurrentToken from "@hooks/useCurrentToken";
import { getTrust } from "@lib/contracts/getTrust";
import { useWeb3React } from "@web3-react/core";
import { useAutoEffect, useAutoMemo } from "hooks.macro";
import { useState } from "react";
import { useSortBy, useTable } from "react-table";
import Chevron from "svgs/Chevron";
import Info from "svgs/Info";
import { placeholderTip } from "text/tooltips";
import Address from "./address";
import Button from "./button";
import HealthBar from "./healthBar";

const StakeTable = () => {
  const { library, account, chainId } = useWeb3React();

  const curToken = useCurrentToken();

  const [data, setData] = useState([]);

  const toggleLearnMoreModal = useLearnMoreModalToggle();

  useAutoEffect(() => {
    let isMounted = true;

    const getTrustData = async () => {
      try {
        if (isMounted) {
          const res = await getTrust(account, curToken, library, chainId);
          setData(res);
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    };

    getTrustData();

    return () => {
      isMounted = false;
    };
  });

  const memoizedColumns = useAutoMemo(() => [
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
  ]);

  const memoizedData = useAutoMemo(data);

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
                        title={placeholderTip}
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
          <img src="/images/table-empty.svg" alt="" />
          <p className="text-lg md:text-xl text-center my-6 max-w-md">
            Borrow without collateral and earn higher interest on your deposits
            if you are a member.
          </p>
          <Button onClick={toggleLearnMoreModal}>Become a member</Button>
        </div>
      )}
    </div>
  );
};

export default StakeTable;
