import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import useReadProvider from "hooks/useReadProvider";
import { getAsyncLogs } from "lib/asyncLogs";
import { useLocalStorage } from "react-use";

// sort and de-duplicate
const sortTxs = (txs) =>
  txs
    .sort((a, b) => b.blockNumber - a.blockNumber)
    .reduce(
      (acc, item) =>
        acc.some((x) => x.hash === item.hash) ? acc : [...acc, item],
      []
    );

export default function useAsyncLogs(filters, parser = identityFn) {
  const { account, chainId } = useWeb3React();
  const readProvider = useReadProvider();
  const [logs, setLogs] = useState([]);
  const [meta, setMeta] = useState({});
  const [storedLogs, save] = useLocalStorage("union:logs", {});

  const shouldFetch =
    typeof account === "string" && !!readProvider && !!chainId;

  useEffect(() => {
    async function load() {
      const iterator = await getAsyncLogs(
        readProvider,
        chainId,
        filters,
        parser
      );

      for await (const item of iterator) {
        if (item && item?.data.length > 0) {
          setLogs((arr) => sortTxs([...arr, ...item.data]));
        }
        setMeta((x) => ({ ...x, ...item }));
      }
    }

    shouldFetch && load();
  }, [shouldFetch]);

  useEffect(
    () => () => {
      save((state) => {
        const currentData = state[meta.key];
        return {
          ...storedLogs,
          [meta.key]: { ...currentData, ...meta, data: logs },
        };
      });
    },
    [meta]
  );

  return {
    ...meta,
    data: logs,
  };
}
