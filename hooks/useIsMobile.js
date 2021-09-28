import { useWindowSize } from "react-use";

export default function useIsMobile() {
  const { width } = useWindowSize();
  const isMobile = width <= 767;
  return isMobile;
}
