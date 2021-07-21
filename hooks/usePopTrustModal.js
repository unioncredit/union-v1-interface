import { useTrustModalToggle } from "components/modals/TrustModal/state";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function usePopTrustModal() {
  const { query } = useRouter();

  const toggleTrustModal = useTrustModalToggle();

  useEffect(() => {
    if (query.address || query.trust) {
      toggleTrustModal();
    }
  }, []);
}
