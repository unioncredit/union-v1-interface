import { useGetInvitedModalToggle } from "components/GetInvitedModal/state";
import { useTrustModalToggle } from "components/TrustModal/state";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import useIsMember from "./useIsMember";
import useToast from "./useToast";

export default function usePopTrustModal() {
  const { query } = useRouter();

  const { data: isMember = false } = useIsMember();

  const toggleGetInvitedModal = useGetInvitedModalToggle();
  const toggleTrustModal = useTrustModalToggle();
  const addToast = useToast();

  useEffect(() => {
    if ((query.address || query.trust) && isMember === true) {
      toggleTrustModal();
    }

    if ((query.address || query.trust) && isMember === false) {
      addToast({
        body: <Fragment>You are not yet a Union member</Fragment>,
        type: "warn",
        hideAfter: 30,
      });

      toggleGetInvitedModal();
    }
  }, []);
}
