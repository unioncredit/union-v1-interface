import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer
} from "react";

const WALLET_MODAL_OPEN = "WALLET_MODAL_OPEN";

const TOGGLE_WALLET_MODAL = "TOGGLE_WALLET_MODAL";

const ApplicationContext = createContext();

ApplicationContext.displayName = "ApplicationContext";

function useApplicationContext() {
  return useContext(ApplicationContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case TOGGLE_WALLET_MODAL: {
      return { ...state, [WALLET_MODAL_OPEN]: !state[WALLET_MODAL_OPEN] };
    }
    default: {
      throw Error(
        `Unexpected action type in ApplicationContext reducer: '${type}'.`
      );
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    [WALLET_MODAL_OPEN]: false
  });

  const toggleWalletModal = useCallback(() => {
    dispatch({ type: TOGGLE_WALLET_MODAL });
  }, []);

  return (
    <ApplicationContext.Provider
      value={useMemo(() => [state, { toggleWalletModal }], [
        state,
        toggleWalletModal
      ])}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

Provider.displayName = "ApplicationProvider";

export function useWalletModalOpen() {
  const [state] = useApplicationContext();

  return state[WALLET_MODAL_OPEN];
}

export function useWalletModalToggle() {
  const [, { toggleWalletModal }] = useApplicationContext();

  return toggleWalletModal;
}
