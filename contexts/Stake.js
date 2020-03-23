import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

const TRUST_MODAL_OPEN = "TRUST_MODAL_OPEN";
const TOGGLE_TRUST_MODAL = "TOGGLE_TRUST_MODAL";

const DEPOSIT_MODAL_OPEN = "DEPOSIT_MODAL_OPEN";
const TOGGLE_DEPOSIT_MODAL = "TOGGLE_DEPOSIT_MODAL";

const WITHDRAW_MODAL_OPEN = "WITHDRAW_MODAL_OPEN";
const TOGGLE_WITHDRAW_MODAL = "TOGGLE_WITHDRAW_MODAL";

const StakeContext = createContext();

StakeContext.displayName = "StakeContext";

function useStakeContext() {
  return useContext(StakeContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case TOGGLE_TRUST_MODAL: {
      return { ...state, [TRUST_MODAL_OPEN]: !state[TRUST_MODAL_OPEN] };
    }
    case TOGGLE_DEPOSIT_MODAL: {
      return { ...state, [DEPOSIT_MODAL_OPEN]: !state[DEPOSIT_MODAL_OPEN] };
    }
    case TOGGLE_WITHDRAW_MODAL: {
      return {
        ...state,
        [WITHDRAW_MODAL_OPEN]: !state[WITHDRAW_MODAL_OPEN],
      };
    }
    default: {
      throw Error(`Unexpected action type in StakeContext reducer: '${type}'.`);
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    [TRUST_MODAL_OPEN]: false,
    [DEPOSIT_MODAL_OPEN]: false,
    [WITHDRAW_MODAL_OPEN]: false,
  });

  const toggleTrustModal = useCallback(() => {
    dispatch({ type: TOGGLE_TRUST_MODAL });
  }, []);

  const toggleDepositModal = useCallback(() => {
    dispatch({ type: TOGGLE_DEPOSIT_MODAL });
  }, []);

  const toggleWithdrawModal = useCallback(() => {
    dispatch({ type: TOGGLE_WITHDRAW_MODAL });
  }, []);

  return (
    <StakeContext.Provider
      value={useMemo(
        () => [
          state,
          { toggleTrustModal, toggleDepositModal, toggleWithdrawModal },
        ],
        [state, toggleTrustModal, toggleDepositModal, toggleWithdrawModal]
      )}
    >
      {children}
    </StakeContext.Provider>
  );
}

Provider.displayName = "StakeProvider";

export function useTrustModalOpen() {
  const [state] = useStakeContext();

  return state[TRUST_MODAL_OPEN];
}

export function useTrustModalToggle() {
  const [, { toggleTrustModal }] = useStakeContext();

  return toggleTrustModal;
}

export function useDepositModalOpen() {
  const [state] = useStakeContext();

  return state[DEPOSIT_MODAL_OPEN];
}

export function useDepositModalToggle() {
  const [, { toggleDepositModal }] = useStakeContext();

  return toggleDepositModal;
}

export function useWithdrawModalOpen() {
  const [state] = useStakeContext();

  return state[WITHDRAW_MODAL_OPEN];
}

export function useWithdrawModalToggle() {
  const [, { toggleWithdrawModal }] = useStakeContext();

  return toggleWithdrawModal;
}
