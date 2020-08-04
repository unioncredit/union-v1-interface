import { useWeb3React } from "@web3-react/core";
import { Fragment } from "react";
import { Failure, Loading, Pending, Success } from "svgs/Alerts";
import getEtherscanLink from "util/getEtherscanLink";

export const ToastBody = ({ body, onDismiss }) => (
  <div className="flex justify-between items-center">
    <p className="mr-4 sm:mr-12 text-sm leading-snug">{body}</p>
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

export const ToastContent = ({ message, hash }) => {
  const { chainId } = useWeb3React();

  if (hash)
    return (
      <Fragment>
        {message}
        <br />
        <a
          className="underline"
          href={getEtherscanLink(chainId, hash, "TRANSACTION")}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Etherscan
        </a>
      </Fragment>
    );

  return message;
};

export const TOAST_ICONS = {
  error: () => <Failure />,
  info: () => <Loading />,
  loading: () => <Loading />,
  success: () => <Success />,
  warn: () => <Pending />,
};
