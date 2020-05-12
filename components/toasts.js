import { Failure, Loading, Pending, Success } from "svgs/Alerts";

export const ToastBody = ({ body, onDismiss }) => (
  <div className="flex justify-between">
    <p className="mr-10 text-sm truncate">{body}</p>
    <button
      className="text-sm font-medium underline focus:outline-none"
      onClick={onDismiss}
    >
      Dismiss
    </button>

    <style jsx global>{`
      .ct-toast {
        padding: calc(1.5rem - 1px);
        border-radius: 0.5rem;
        box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.04);
        border: 1px solid #f3f4f7;
      }

      .ct-text-group {
        margin-left: 1.5rem;
      }
    `}</style>
  </div>
);

export const TOAST_ICONS = {
  error: () => <Failure />,
  info: () => <Loading />,
  loading: () => <Loading />,
  success: () => <Success />,
  warn: () => <Pending />,
};
