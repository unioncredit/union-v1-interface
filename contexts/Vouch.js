import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer
} from "react";

const CREDIT_REQUEST_MODAL = "CREDIT_REQUEST_MODAL";

const TOGGLE_CREDIT_REQUEST_MODAL = "TOGGLE_CREDIT_REQUEST_MODAL";

const VouchContext = createContext();

VouchContext.displayName = "VouchContext";

function useVouchContext() {
  return useContext(VouchContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case TOGGLE_CREDIT_REQUEST_MODAL: {
      return { ...state, [CREDIT_REQUEST_MODAL]: !state[CREDIT_REQUEST_MODAL] };
    }
    default: {
      throw Error(`Unexpected action type in VouchContext reducer: '${type}'.`);
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    [CREDIT_REQUEST_MODAL]: false
  });

  const toggleCreditRequest = useCallback(() => {
    dispatch({ type: TOGGLE_CREDIT_REQUEST_MODAL });
  }, []);

  return (
    <VouchContext.Provider
      value={useMemo(() => [state, { toggleCreditRequest }], [
        state,
        toggleCreditRequest
      ])}
    >
      {children}
    </VouchContext.Provider>
  );
}

Provider.displayName = "VouchProvider";

export function useCreditRequestModalOpen() {
  const [state] = useVouchContext();

  return state[CREDIT_REQUEST_MODAL];
}

export function useCreditRequestModalToggle() {
  const [, { toggleCreditRequest }] = useVouchContext();

  return toggleCreditRequest;
}
