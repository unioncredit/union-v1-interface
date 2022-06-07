import { LoadingSpinner } from "@unioncredit/ui";

import "./LoadingOverlay.scss";

export function LoadingOverlay() {
  return (
    <div className="loadingOverlay">
      <LoadingSpinner size={24} />
    </div>
  );
}
