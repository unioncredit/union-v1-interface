import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer
} from "react";

const VOUCH_MODAL_OPEN = "VOUCH_MODAL_OPEN";

const TOGGLE_VOUCH_MODAL = "TOGGLE_VOUCH_MODAL";

const VouchContext = createContext();

function useVouchContext() {
  return useContext(VouchContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case TOGGLE_VOUCH_MODAL: {
      return { ...state, [VOUCH_MODAL_OPEN]: !state[VOUCH_MODAL_OPEN] };
    }
    default: {
      throw Error(`Unexpected action type in VouchContext reducer: '${type}'.`);
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    [VOUCH_MODAL_OPEN]: false
  });

  const toggleVouchModal = useCallback(() => {
    dispatch({ type: TOGGLE_VOUCH_MODAL });
  }, []);

  return (
    <VouchContext.Provider
      value={useMemo(() => [state, { toggleVouchModal }], [
        state,
        toggleVouchModal
      ])}
    >
      {children}
    </VouchContext.Provider>
  );
}

export function useVouchModalOpen() {
  const [state] = useVouchContext();

  return state[VOUCH_MODAL_OPEN];
}

export function useVouchModalToggle() {
  const [, { toggleVouchModal }] = useVouchContext();

  return toggleVouchModal;
}
