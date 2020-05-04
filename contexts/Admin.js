import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

const MARKET_MODAL_OPEN = "MARKET_MODAL_OPEN";
const TOGGLE_MARKET_MODAL = "TOGGLE_MARKET_MODAL";

const MANAGER_MODAL_OPEN = "MANAGER_MODAL_OPEN";
const TOGGLE_MANAGER_MODAL = "TOGGLE_MANAGER_MODAL";

const AdminContext = createContext();

AdminContext.displayName = "AdminContext";

function useAdminContext() {
  return useContext(AdminContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case TOGGLE_MARKET_MODAL: {
      return {
        ...state,
        [MARKET_MODAL_OPEN]: !state[MARKET_MODAL_OPEN],
      };
    }
    case TOGGLE_MANAGER_MODAL: {
      return {
        ...state,
        [MANAGER_MODAL_OPEN]: !state[MANAGER_MODAL_OPEN],
      };
    }

    default: {
      throw new Error(
        `Unexpected action type in AdminContext reducer: '${type}'.`
      );
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    [MARKET_MODAL_OPEN]: false,
    [MANAGER_MODAL_OPEN]: false,
  });

  const toggleMarketModal = useCallback(() => {
    dispatch({ type: TOGGLE_MARKET_MODAL });
  }, []);

  const toggleManagerModal = useCallback(() => {
    dispatch({ type: TOGGLE_MANAGER_MODAL });
  }, []);

  return (
    <AdminContext.Provider
      value={useMemo(
        () => [
          state,
          {
            toggleMarketModal,
            toggleManagerModal,
          },
        ],
        [state, toggleMarketModal, toggleManagerModal]
      )}
    >
      {children}
    </AdminContext.Provider>
  );
}

Provider.displayName = "MarketProvider";

export function useMarketModalOpen() {
  const [state] = useAdminContext();

  return state[MARKET_MODAL_OPEN];
}

export function useMarketModalToggle() {
  const [, { toggleMarketModal }] = useAdminContext();

  return toggleMarketModal;
}

export function useManagerModalOpen() {
  const [state] = useAdminContext();

  return state[MANAGER_MODAL_OPEN];
}

export function useManagerModalToggle() {
  const [, { toggleManagerModal }] = useAdminContext();

  return toggleManagerModal;
}
