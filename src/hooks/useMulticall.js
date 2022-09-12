import { useCallback } from "react";
import flatten from "lodash/flatten";
import chunk from "lodash/chunk";

import useContract from "hooks/useContract";
import ABI from "constants/abis/multicall.json";
import useReadProvider from "hooks/useReadProvider";
import useChainId from "hooks/useChainId";
import { MULTICALL_ADDRESSES } from "constants/variables";

export default function useMulticall() {
  const chainId = useChainId();
  const readProvider = useReadProvider();
  const multiCall = useContract(
    MULTICALL_ADDRESSES[chainId],
    ABI,
    readProvider
  );

  const mutliCallHandler = useCallback(
    async (calls) => {
      const chunkSize = Array.isArray(calls[0]) ? calls[0].length : 1;

      const callsFlat = flatten(calls);

      const calldata = callsFlat.map((call) => [
        call.address.toLowerCase(),
        call.itf.encodeFunctionData(call.name, call.params),
      ]);

      const { returnData } = await multiCall.aggregate(calldata, {
        gasLimit: 30000000,
      });

      const resp = returnData.map((call, i) =>
        callsFlat[i].itf.decodeFunctionResult(callsFlat[i].name, call)
      );

      return chunkSize > 1 ? chunk(resp, chunkSize) : resp;
    },
    [multiCall]
  );

  return multiCall && mutliCallHandler;
}
