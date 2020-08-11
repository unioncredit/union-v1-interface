import Button from "components/button";
import useWeb3 from "hooks/useWeb3";
import Head from "next/head";
import { useEffect, Fragment } from "react";
import { formatEther } from "@ethersproject/units";
import useSWR from "swr";

export default function TestPage() {
  const { connect, disconnect, account, error } = useWeb3();

  useEffect(() => {
    if (error) {
      window.alert(error.message);
    }
  }, [error]);

  return (
    <div className="my-8 md:my-10">
      <Head>
        <title>Test | Union</title>
      </Head>

      <div className="px-4 max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Account />
          <ChainId />
          <Balance />
          <BlockNumber />
        </div>

        {account ? (
          <Button full invert onClick={disconnect}>
            Disconnect
          </Button>
        ) : (
          <Button full onClick={connect}>
            Connect
          </Button>
        )}
      </div>
    </div>
  );
}

const Account = () => {
  const { account } = useWeb3();

  return (
    <Fragment>
      <p>
        Account{" "}
        <span role="img" aria-label="robot">
          🤖
        </span>
      </p>
      <p className="truncate">{account ?? ""}</p>
    </Fragment>
  );
};

const ChainId = () => {
  const { chainId } = useWeb3();

  return (
    <Fragment>
      <p>
        Chain Id{" "}
        <span role="img" aria-label="chain">
          ⛓
        </span>
      </p>
      <p>{chainId ?? ""}</p>
    </Fragment>
  );
};

const getBalance = async (_, account, library) => {
  const balance = await library.getBalance(account);

  return balance;
};

const Balance = () => {
  const { account, library, chainId } = useWeb3();

  const shouldFetch =
    typeof account === "string" && library && typeof chainId === "number";

  const { data: balance } = useSWR(
    shouldFetch ? ["EthBalance", account, library, chainId] : null,
    getBalance
  );

  return (
    <Fragment>
      <p>
        Balance{" "}
        <span role="img" aria-label="gold">
          💰
        </span>
      </p>
      <p className="truncate">{balance ? formatEther(balance) : ""}</p>
    </Fragment>
  );
};

const getBlockNumber = async (_, library) => {
  return library.getBlockNumber();
};

const BlockNumber = () => {
  const { library, chainId } = useWeb3();

  const shouldFetch = library && typeof chainId === "number";

  const { data: blockNumber } = useSWR(
    shouldFetch ? ["BlockNumber", library, chainId] : null,
    getBlockNumber
  );

  return (
    <Fragment>
      <p>
        Block Number{" "}
        <span role="img" aria-label="numbers">
          🔢
        </span>
      </p>
      <p>{blockNumber ?? ""}</p>
    </Fragment>
  );
};
