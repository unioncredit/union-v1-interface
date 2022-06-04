import { useVouchModal } from "components-ui/modals";
import { useEffect } from "react";

export default function usePopTrustModal() {
  const { open: openVouchModal } = useVouchModal();

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const address = search.get("address");
    if (address) {
      openVouchModal();
    }
  }, []);
}
