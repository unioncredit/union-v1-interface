import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

const CREDIT_REQUEST_MODAL = "CREDIT_REQUEST_MODAL";
const TOGGLE_CREDIT_REQUEST_MODAL = "TOGGLE_CREDIT_REQUEST_MODAL";

const GET_INVITED_MODAL = "GET_INVITED_MODAL";
const TOGGLE_GET_INVITED_MODAL = "TOGGLE_GET_INVITED_MODAL";

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
    case TOGGLE_GET_INVITED_MODAL: {
      return { ...state, [GET_INVITED_MODAL]: !state[GET_INVITED_MODAL] };
    }
    default: {
      throw Error(`Unexpected action type in VouchContext reducer: '${type}'.`);
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    [CREDIT_REQUEST_MODAL]: false,
    [GET_INVITED_MODAL]: false,
  });

  const toggleCreditRequestModal = useCallback(() => {
    dispatch({ type: TOGGLE_CREDIT_REQUEST_MODAL });
  }, []);

  const toggleGetInvitedModal = useCallback(() => {
    dispatch({ type: TOGGLE_GET_INVITED_MODAL });
  }, []);

  return (
    <VouchContext.Provider
      value={useMemo(
        () => [
          state,
          {
            toggleCreditRequestModal,
            toggleGetInvitedModal,
          },
        ],
        [state, toggleCreditRequestModal, toggleGetInvitedModal]
      )}
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
  const [, { toggleCreditRequestModal }] = useVouchContext();

  return toggleCreditRequestModal;
}

export function useGetInvitedModalOpen() {
  const [state] = useVouchContext();

  return state[GET_INVITED_MODAL];
}

export function useGetInvitedModalToggle() {
  const [, { toggleGetInvitedModal }] = useVouchContext();

  return toggleGetInvitedModal;
}
