import { newRidgeState } from "react-ridge-state";

const initialState = false;

export const drawerOpenState = newRidgeState(initialState);

export default function useIsDrawerOpen() {
  return drawerOpenState.useValue();
}
