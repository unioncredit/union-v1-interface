import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { newRidgeState } from "react-ridge-state";

const initialState = false;

export const forceConnectState = newRidgeState(initialState);

export function useForceConnect() {
  return forceConnectState.use();
}

export function useUpdateForceConnect() {
  const [state, setState] = useForceConnect();
  const { library, account } = useWeb3React();

  useEffect(() => {
    if (library && account && state) {
      setState(false);
    }
  }, [library, account]);
}
