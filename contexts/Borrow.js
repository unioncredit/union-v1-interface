import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer
} from "react";

const BORROW_MODAL_OPEN = "BORROW_MODAL_OPEN";
const TOGGLE_BORROW_MODAL = "TOGGLE_BORROW_MODAL";

const REPAY_MODAL_OPEN = "REPAY_MODAL_OPEN";
const TOGGLE_REPAY_MODAL = "TOGGLE_REPAY_MODAL";

const BorrowContext = createContext();

BorrowContext.displayName = "BorrowContext";

function useBorrowContext() {
  return useContext(BorrowContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case TOGGLE_BORROW_MODAL: {
      return { ...state, [BORROW_MODAL_OPEN]: !state[BORROW_MODAL_OPEN] };
    }
    case TOGGLE_REPAY_MODAL: {
      return { ...state, [REPAY_MODAL_OPEN]: !state[REPAY_MODAL_OPEN] };
    }
    default: {
      throw Error(
        `Unexpected action type in BorrowContext reducer: '${type}'.`
      );
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    [BORROW_MODAL_OPEN]: false,
    [REPAY_MODAL_OPEN]: false
  });

  const toggleBorrowModal = useCallback(() => {
    dispatch({ type: TOGGLE_BORROW_MODAL });
  }, []);

  const toggleRepayModal = useCallback(() => {
    dispatch({ type: TOGGLE_REPAY_MODAL });
  }, []);

  return (
    <BorrowContext.Provider
      value={useMemo(() => [state, { toggleBorrowModal, toggleRepayModal }], [
        state,
        toggleBorrowModal,
        toggleRepayModal
      ])}
    >
      {children}
    </BorrowContext.Provider>
  );
}

Provider.displayName = "BorrowProvider";

export function useBorrowModalOpen() {
  const [state] = useBorrowContext();

  return state[BORROW_MODAL_OPEN];
}

export function useBorrowModalToggle() {
  const [, { toggleBorrowModal }] = useBorrowContext();

  return toggleBorrowModal;
}

export function useRepayModalOpen() {
  const [state] = useBorrowContext();

  return state[REPAY_MODAL_OPEN];
}

export function useRepayModalToggle() {
  const [, { toggleRepayModal }] = useBorrowContext();

  return toggleRepayModal;
}
