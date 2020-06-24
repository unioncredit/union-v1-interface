import { Failure, Loading, Pending, Success } from "svgs/Alerts";

export const ToastBody = ({ body, onDismiss }) => (
  <div className="flex justify-between items-center">
    <p className="mr-4 sm:mr-12 text-sm truncate leading-snug">{body}</p>
    <button
      className="text-sm font-medium underline focus:outline-none"
      onClick={onDismiss}
    >
      Dismiss
    </button>

    <style jsx global>{`
      .ct-toast {
        justify-content: flex-start;
        padding: calc(1rem - 1px);
        border-radius: 0.5rem;
        box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.04);
        border: 1px solid #f3f4f7;
      }

      @media screen and (min-width: 40em) {
        .ct-toast {
          min-width: 440px;
          padding: calc(1.5rem - 1px);
        }
      }

      .ct-text-group {
        margin-left: 1.5rem;
        flex: 1;
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
