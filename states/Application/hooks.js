import { walletModalState, walletModalViewState } from "./states";

export function useWalletModalView() {
  /**
   * @type {("SIGN_IN"|"CREATE")}
   */
  const state = walletModalViewState.useValue();

  return state;
}

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

export function useWalletModalOpen() {
  const state = walletModalState.useValue();

  return state;
}

export function useWalletModalToggle() {
  const [state, setState] = walletModalState.use();

  const toggle = () => {
    setState(!state);
  };

  return toggle;
}

export function useToggleSignInModal() {
  const toggleWalletModal = useWalletModalToggle();
  const { setWalletViewSignIn } = useUpdateWalletModalView();

  const toggle = () => {
    setWalletViewSignIn();
    toggleWalletModal();
  };

  return toggle;
}

export function useToggleCreateModal() {
  const toggleWalletModal = useWalletModalToggle();
  const { setWalletViewCreate } = useUpdateWalletModalView();

  const toggle = () => {
    setWalletViewCreate();
    toggleWalletModal();
  };

  return toggle;
}
