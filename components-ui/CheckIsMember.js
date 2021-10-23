import { LoadingSpinner } from "union-ui";
import useMemberCheck from "hooks/useMemberCheck";

export function CheckIsMember({ children }) {
  const { isLoading } = useMemberCheck();

  if (isLoading) {
    return (
      <div className="loading-screen">
        <LoadingSpinner size={30} />
      </div>
    );
  }

  return children;
}
