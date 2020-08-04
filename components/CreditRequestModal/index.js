import VisuallyHidden from "@reach/visually-hidden";
import { useWeb3React } from "@web3-react/core";
import { useAutoCallback } from "hooks.macro";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Telegram from "svgs/Telegram";
import Twitter from "svgs/Twitter";
import generateLink from "util/generateLink";
import Button from "../button";
import Input from "../input";
import Modal, { ModalHeader } from "../modal";
import VouchLink from "../vouchLink";
import {
  useCreditRequestModalOpen,
  useCreditRequestModalToggle,
} from "./state";
import errorMessages from "text/errorMessages";

const QRCode = dynamic(() => import("../shareQRCode"));

const SHARE_MESSAGE = `Please vouch for me on Union!`;

const generateTwitterLink = (shareLink) =>
  `https://twitter.com/intent/tweet?text=${SHARE_MESSAGE}&url=${encodeURIComponent(
    shareLink
  )}&via=unionprotocol`;

const generateTelegramLink = (shareLink) =>
  `https://telegram.me/share/url?text=${SHARE_MESSAGE}&url=${encodeURIComponent(
    shareLink
  )}`;

const CreditRequestModal = () => {
  const open = useCreditRequestModalOpen();
  const toggle = useCreditRequestModalToggle();

  const [shareLink, setShareLink] = useState(undefined);

  const { account } = useWeb3React();

  const { handleSubmit, register, errors, reset } = useForm();

  useEffect(() => reset(), [open]);

  const onSubmit = useAutoCallback(async (values) => {
    const { amount } = values;

    try {
      setShareLink(generateLink(account, amount));
    } catch (err) {
      console.error(err);
    }
  });

  useEffect(() => {
    return () => {
      setShareLink(undefined);
    };
  }, [open]);

  return (
    <Modal wide={!!shareLink} isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Ask for a vouch" onDismiss={toggle} />

      {shareLink ? (
        <div className="text-center px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex justify-center mb-8" style={{ height: 104 }}>
            <QRCode link={shareLink} />
          </div>
          <h2 className="text-xl mb-4">Ask a friend to vouch for you!</h2>
          <p className="text-type-light leading-tight mb-12">
            Just share the link below or let them scan the QR code to access
            Union and have them vouch for you.
          </p>
          <VouchLink link={shareLink} />

          <div className="mt-8 mb-2 flex justify-center">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={generateTwitterLink(shareLink)}
              className="focus:outline-none bg-white rounded focus:shadow-outline p-2 mx-4"
            >
              <VisuallyHidden>Twitter</VisuallyHidden>
              <Twitter />
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href={generateTelegramLink(shareLink)}
              className="focus:outline-none bg-white rounded focus:shadow-outline p-2 mx-4"
            >
              <VisuallyHidden>Telegram</VisuallyHidden>
              <Telegram />
            </a>
          </div>
        </div>
      ) : (
        <form
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
          className="px-4 py-6 sm:px-6 sm:py-8"
        >
          <p className="mb-4">Ask someone to vouch for you</p>
          <Input
            autoFocus
            chip="DAI"
            id="amount"
            label="Amount"
            name="amount"
            placeholder="0.00"
            tip="Tip: You can leave this amount input open"
            type="number"
            error={errors.amount}
            ref={register({
              min: {
                value: 1.0,
                message: errorMessages.minVouch,
              },
            })}
          />

          <div className="mt-20">
            <Button full type="submit">
              Generate link
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default CreditRequestModal;
