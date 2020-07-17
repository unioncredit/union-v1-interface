import { useTutorialModalToggle } from "components/TutorialModal/state";
import { parseCookies } from "nookies";
import { useEffect } from "react";

export default function usePopTutorialModal() {
  const toggleTutorialModal = useTutorialModalToggle();

  const { tutorial_modal_completed } = parseCookies();

  useEffect(() => {
    if (!tutorial_modal_completed) {
      toggleTutorialModal();
    }
  }, [tutorial_modal_completed]);
}
