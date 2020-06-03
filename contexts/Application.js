import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

const EMAIL_MODAL_OPEN = "EMAIL_MODAL_OPEN";
const TOGGLE_EMAIL_MODAL = "TOGGLE_EMAIL_MODAL";

const GET_INVITED_MODAL = "GET_INVITED_MODAL";
const TOGGLE_GET_INVITED_MODAL = "TOGGLE_GET_INVITED_MODAL";

const LEARN_MORE_MODAL = "LEARN_MORE_MODAL";
const TOGGLE_LEARN_MORE_MODAL = "TOGGLE_LEARN_MORE_MODAL";

const ApplicationContext = createContext();

ApplicationContext.displayName = "ApplicationContext";

function useApplicationContext() {
  return useContext(ApplicationContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case TOGGLE_EMAIL_MODAL: {
      return { ...state, [EMAIL_MODAL_OPEN]: !state[EMAIL_MODAL_OPEN] };
    }
    case TOGGLE_GET_INVITED_MODAL: {
      return { ...state, [GET_INVITED_MODAL]: !state[GET_INVITED_MODAL] };
    }
    case TOGGLE_LEARN_MORE_MODAL: {
      return { ...state, [LEARN_MORE_MODAL]: !state[LEARN_MORE_MODAL] };
    }
    default: {
      throw new Error(
        `Unexpected action type in ApplicationContext reducer: '${type}'.`
      );
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    [EMAIL_MODAL_OPEN]: false,
    [GET_INVITED_MODAL]: false,
    [LEARN_MORE_MODAL]: false,
  });

  const toggleEmailModal = useCallback(() => {
    dispatch({ type: TOGGLE_EMAIL_MODAL });
  }, []);

  const toggleGetInvitedModal = useCallback(() => {
    dispatch({ type: TOGGLE_GET_INVITED_MODAL });
  }, []);

  const toggleLearnMoreModal = useCallback(() => {
    dispatch({ type: TOGGLE_LEARN_MORE_MODAL });
  }, []);

  return (
    <ApplicationContext.Provider
      value={useMemo(
        () => [
          state,
          {
            toggleEmailModal,
            toggleGetInvitedModal,
            toggleLearnMoreModal,
          },
        ],
        [state, toggleEmailModal, toggleGetInvitedModal, toggleLearnMoreModal]
      )}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

Provider.displayName = "ApplicationProvider";

export function useEmailModalOpen() {
  const [state] = useApplicationContext();

  return state[EMAIL_MODAL_OPEN];
}

/**
 * @returns {VoidFunction}
 */
export function useEmailModalToggle() {
  const [, { toggleEmailModal }] = useApplicationContext();

  return toggleEmailModal;
}

export function useGetInvitedModalOpen() {
  const [state] = useApplicationContext();

  return state[GET_INVITED_MODAL];
}

/**
 * @returns {VoidFunction}
 */
export function useGetInvitedModalToggle() {
  const [, { toggleGetInvitedModal }] = useApplicationContext();

  return toggleGetInvitedModal;
}

export function useLearnMoreModalOpen() {
  const [state] = useApplicationContext();

  return state[LEARN_MORE_MODAL];
}

/**
 * @returns {VoidFunction}
 */
export function useLearnMoreModalToggle() {
  const [, { toggleLearnMoreModal }] = useApplicationContext();

  return toggleLearnMoreModal;
}
