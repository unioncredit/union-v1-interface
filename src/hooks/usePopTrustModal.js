import { useVouchModal } from "components-ui/modals";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function usePopTrustModal() {
  const { query } = useRouter();
  const { open: openVouchModal } = useVouchModal();

  useEffect(() => {
    if (query.address || query.trust) {
      openVouchModal();
    }
  }, []);
}
