import safeAccess from "@util/safeAccess";
import { useWeb3React } from "@web3-react/core";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const BLOCK_NUMBER = "BLOCK_NUMBER";
const UPDATE_BLOCK_NUMBER = "UPDATE_BLOCK_NUMBER";

const WALLET_MODAL_OPEN = "WALLET_MODAL_OPEN";
const TOGGLE_WALLET_MODAL = "TOGGLE_WALLET_MODAL";

const EMAIL_MODAL_OPEN = "EMAIL_MODAL_OPEN";
const TOGGLE_EMAIL_MODAL = "TOGGLE_EMAIL_MODAL";

const GET_INVITED_MODAL = "GET_INVITED_MODAL";
const TOGGLE_GET_INVITED_MODAL = "TOGGLE_GET_INVITED_MODAL";

const LEARN_MORE_MODAL = "LEARN_MORE_MODAL";
const TOGGLE_LEARN_MORE_MODAL = "TOGGLE_LEARN_MORE_MODAL";

const WALLET_VIEWS = {
  SIGN_IN: "SIGN_IN",
  CREATE: "CREATE",
};

const WALLET_MODAL_VIEW = "WALLET_MODAL_VIEW";
const UPDATE_WALLET_MODAL_VIEW = "UPDATE_WALLET_MODAL_VIEW";

const ApplicationContext = createContext();

ApplicationContext.displayName = "ApplicationContext";

function useApplicationContext() {
  return useContext(ApplicationContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE_BLOCK_NUMBER: {
      const { networkId, blockNumber } = payload;
      return {
        ...state,
        [BLOCK_NUMBER]: {
          ...(safeAccess(state, [BLOCK_NUMBER]) || {}),
          [networkId]: blockNumber,
        },
      };
    }
    case TOGGLE_WALLET_MODAL: {
      return { ...state, [WALLET_MODAL_OPEN]: !state[WALLET_MODAL_OPEN] };
    }
    case TOGGLE_EMAIL_MODAL: {
      return { ...state, [EMAIL_MODAL_OPEN]: !state[EMAIL_MODAL_OPEN] };
    }
    case TOGGLE_GET_INVITED_MODAL: {
      return { ...state, [GET_INVITED_MODAL]: !state[GET_INVITED_MODAL] };
    }
    case TOGGLE_LEARN_MORE_MODAL: {
      return { ...state, [LEARN_MORE_MODAL]: !state[LEARN_MORE_MODAL] };
    }
    case UPDATE_WALLET_MODAL_VIEW: {
      const { view } = payload;
      return {
        ...state,
        [WALLET_MODAL_VIEW]: WALLET_VIEWS[view],
      };
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
    [BLOCK_NUMBER]: {},
    [WALLET_MODAL_OPEN]: false,
    [EMAIL_MODAL_OPEN]: false,
    [GET_INVITED_MODAL]: false,
    [LEARN_MORE_MODAL]: false,
    [WALLET_MODAL_VIEW]: WALLET_VIEWS.CREATE,
  });

  const updateBlockNumber = useCallback((networkId, blockNumber) => {
    dispatch({
      type: UPDATE_BLOCK_NUMBER,
      payload: { networkId, blockNumber },
    });
  }, []);

  const toggleWalletModal = useCallback(() => {
    dispatch({ type: TOGGLE_WALLET_MODAL });
  }, []);

  const toggleEmailModal = useCallback(() => {
    dispatch({ type: TOGGLE_EMAIL_MODAL });
  }, []);

  const toggleGetInvitedModal = useCallback(() => {
    dispatch({ type: TOGGLE_GET_INVITED_MODAL });
  }, []);

  const toggleLearnMoreModal = useCallback(() => {
    dispatch({ type: TOGGLE_LEARN_MORE_MODAL });
  }, []);

  const updateWalletModalView = useCallback((view) => {
    dispatch({
      type: UPDATE_WALLET_MODAL_VIEW,
      payload: { view },
    });
  }, []);

  return (
    <ApplicationContext.Provider
      value={useMemo(
        () => [
          state,
          {
            updateBlockNumber,
            toggleWalletModal,
            toggleEmailModal,
            toggleGetInvitedModal,
            toggleLearnMoreModal,
            updateWalletModalView,
          },
        ],
        [
          state,
          updateBlockNumber,
          toggleWalletModal,
          toggleEmailModal,
          toggleGetInvitedModal,
          toggleLearnMoreModal,
          updateWalletModalView,
        ]
      )}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

Provider.displayName = "ApplicationProvider";

export function Updater() {
  const { library, chainId } = useWeb3React();

  const [, { updateBlockNumber }] = useApplicationContext();

  // update block number
  useEffect(() => {
    if (library) {
      let stale = false;

      function update() {
        library
          .getBlockNumber()
          .then((blockNumber) => {
            if (!stale) {
              updateBlockNumber(chainId, blockNumber);
            }
          })
          .catch(() => {
            if (!stale) {
              updateBlockNumber(chainId, null);
            }
          });
      }

      update();

      library.on("block", update);

      return () => {
        stale = true;
        library.removeListener("block", update);
      };
    }
  }, [chainId, library, updateBlockNumber]);

  return null;
}

export function useBlockNumber() {
  const { chainId } = useWeb3React();

  const [state] = useApplicationContext();

  return safeAccess(state, [BLOCK_NUMBER, chainId]);
}

export function useWalletModalOpen() {
  const [state] = useApplicationContext();

  return state[WALLET_MODAL_OPEN];
}

/**
 * @returns {VoidFunction}
 */
export function useWalletModalToggle() {
  const [, { toggleWalletModal }] = useApplicationContext();

  return toggleWalletModal;
}

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

export function useWalletModalView() {
  const [state] = useApplicationContext();

  return state[WALLET_MODAL_VIEW];
}

export function useUpdateWalletModalView() {
  const [, { updateWalletModalView }] = useApplicationContext();

  const setWalletViewCreate = useCallback(() => {
    updateWalletModalView(WALLET_VIEWS.CREATE);
  }, []);

  const setWalletViewSignIn = useCallback(() => {
    updateWalletModalView(WALLET_VIEWS.SIGN_IN);
  }, []);

  return {
    setWalletViewCreate,
    setWalletViewSignIn,
  };
}

export function useToggleSignInModal() {
  const [
    ,
    { updateWalletModalView, toggleWalletModal },
  ] = useApplicationContext();

  const toggle = useCallback(() => {
    updateWalletModalView(WALLET_VIEWS.SIGN_IN);
    toggleWalletModal();
  }, []);

  return toggle;
}

export function useToggleCreateModal() {
  const [
    ,
    { updateWalletModalView, toggleWalletModal },
  ] = useApplicationContext();

  const toggle = useCallback(() => {
    updateWalletModalView(WALLET_VIEWS.CREATE);
    toggleWalletModal();
  }, []);

  return toggle;
}
