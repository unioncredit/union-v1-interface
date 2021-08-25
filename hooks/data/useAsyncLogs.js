import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import useReadProvider from "hooks/useReadProvider";
import { getAsyncLogs } from "lib/asyncLogs";
import { useLocalStorage } from "react-use";
import useToast, { FLAVORS } from "hooks/useToast";

// sort and de-duplicate
const sortTxs = (txs) =>
  txs
    .sort((a, b) => b.blockNumber - a.blockNumber)
    .reduce(
      (acc, item) =>
        acc.some((x) => x.hash === item.hash) ? acc : [...acc, item],
      []
    );

const identityFn = (d) => d;

export default function useAsyncLogs(
  filters,
  parser = identityFn,
  shouldSave = true
) {
  const addToast = useToast();
  const { account, chainId } = useWeb3React();
  const readProvider = useReadProvider();
  const [logs, setLogs] = useState([]);
  const [meta, setMeta] = useState({});
  const [storedLogs, save] = useLocalStorage("union:logs", {});

  useEffect(() => {
    async function load() {
      try {
        const iterator = getAsyncLogs(readProvider, chainId, filters, parser);

        for await (const item of iterator) {
          if (item && item?.data.length > 0) {
            setLogs((arr) => sortTxs([...arr, ...item.data]));
          }
          setMeta((x) => ({ ...x, ...item }));
        }
      } catch (err) {
        console.log(err);
        addToast(FLAVORS.ERROR("Something went wrong. Please reload"));
      }
    }

    chainId && account && readProvider && load();
  }, [readProvider, chainId, account]);

  useEffect(
    () => () => {
      shouldSave &&
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

  const isLoading = !meta.chunk || !meta.chunks || meta.chunk < meta.chunks;
  const isEmpty = !isLoading && logs.length <= 0;
  const loadingMaxCount = 3 - logs?.length;
  const loadingCount =
    isLoading && (loadingMaxCount <= 0 ? 1 : loadingMaxCount);

  return {
    ...meta,
    isLoading,
    isEmpty,
    loadingCount,
    data: logs,
  };
}
