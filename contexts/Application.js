import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

const WALLET_MODAL_OPEN = "WALLET_MODAL_OPEN";
const TOGGLE_WALLET_MODAL = "TOGGLE_WALLET_MODAL";

const EMAIL_MODAL_OPEN = "EMAIL_MODAL_OPEN";
const TOGGLE_EMAIL_MODAL = "TOGGLE_EMAIL_MODAL";

const GET_INVITED_MODAL = "GET_INVITED_MODAL";
const TOGGLE_GET_INVITED_MODAL = "TOGGLE_GET_INVITED_MODAL";

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
    case TOGGLE_EMAIL_MODAL: {
      return { ...state, [EMAIL_MODAL_OPEN]: !state[EMAIL_MODAL_OPEN] };
    }
    case TOGGLE_GET_INVITED_MODAL: {
      return { ...state, [GET_INVITED_MODAL]: !state[GET_INVITED_MODAL] };
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
    [WALLET_MODAL_OPEN]: false,
    [EMAIL_MODAL_OPEN]: false,
    [GET_INVITED_MODAL]: false,
  });

  const toggleWalletModal = useCallback(() => {
    dispatch({ type: TOGGLE_WALLET_MODAL });
  }, []);

  const toggleEmailModal = useCallback(() => {
    dispatch({ type: TOGGLE_EMAIL_MODAL });
  }, []);

  const toggleGetInvitedModal = useCallback(() => {
    dispatch({ type: TOGGLE_GET_INVITED_MODAL });
  }, []);

  return (
    <ApplicationContext.Provider
      value={useMemo(
        () => [
          state,
          { toggleWalletModal, toggleEmailModal, toggleGetInvitedModal },
        ],
        [state, toggleWalletModal, toggleEmailModal, toggleGetInvitedModal]
      )}
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

export function useEmailModalOpen() {
  const [state] = useApplicationContext();

  return state[EMAIL_MODAL_OPEN];
}

export function useEmailModalToggle() {
  const [, { toggleEmailModal }] = useApplicationContext();

  return toggleEmailModal;
}

export function useGetInvitedModalOpen() {
  const [state] = useVouchContext();

  return state[GET_INVITED_MODAL];
}

export function useGetInvitedModalToggle() {
  const [, { toggleGetInvitedModal }] = useVouchContext();

  return toggleGetInvitedModal;
}
