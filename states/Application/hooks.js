import { walletModalState, walletModalViewState } from "./states";

/**
 * @name useWalletModalView
 * @returns {("SIGN_IN"|"CREATE")}
 */
export function useWalletModalView() {
  const state = walletModalViewState.useValue();

  return state;
}

/**
 * @name useUpdateWalletModalView
 */
export function useUpdateWalletModalView() {
  const [, setState] = walletModalViewState.use();

  const setWalletViewCreate = () => {
    setState("CREATE");
  };

  const setWalletViewSignIn = () => {
    setState("SIGN_IN");
  };

  return {
    setWalletViewCreate,
    setWalletViewSignIn,
  };
}

/**
 * @name useWalletModalOpen
 */
export function useWalletModalOpen() {
  const state = walletModalState.useValue();

  return state;
}

/**
 * @name useWalletModalToggle
 */
export function useWalletModalToggle() {
  const [state, setState] = walletModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}

/**
 * @name useToggleSignInModal
 */
export function useToggleSignInModal() {
  const toggleWalletModal = useWalletModalToggle();
  const { setWalletViewSignIn } = useUpdateWalletModalView();

  const toggle = () => {
    setWalletViewSignIn();
    toggleWalletModal();
  };

  return toggle;
}

/**
 * @name useToggleCreateModal
 */
export function useToggleCreateModal() {
  const toggleWalletModal = useWalletModalToggle();
  const { setWalletViewCreate } = useUpdateWalletModalView();

  const toggle = () => {
    setWalletViewCreate();
    toggleWalletModal();
  };

  return toggle;
}
