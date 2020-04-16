import {
  useCreditRequestModalOpen,
  useCreditRequestModalToggle,
} from "@contexts/Vouch";
import { useWeb3React } from "@web3-react/core";
import dyanmic from "next/dynamic";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCopyToClipboard } from "react-use";
import Telegram from "svgs/Telegram";
import Twitter from "svgs/Twitter";
import Button from "./button";
import Input from "./input";
import Modal, { ModalHeader } from "./modal";

const QRCode = dyanmic(() => import("./shareQRCode"));

const SHARE_MESSAGE = `Please vouch for me on Union!`;

const generateLink = (address, amount) => {
  if (!address) throw new Error("`account` is required");

  return `${window.location.origin}/stake?address=${address}${
    amount && "&trust=" + amount
  }`;
};

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
  const [{ value: copied }, copyToClipboard] = useCopyToClipboard();

  const { account } = useWeb3React();

  const { handleSubmit, register } = useForm();

  const onSubmit = async (values) => {
    const { amount } = values;

    try {
      setShareLink(generateLink(account, amount));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    return () => {
      setShareLink(undefined);
    };
  }, [open]);

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Ask for a vouch" onDismiss={toggle} />

      {shareLink ? (
        <div className="text-center px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex justify-center mb-8">
            <QRCode link={shareLink} />
          </div>
          <h2 className="text-xl mb-4">Ask a friend to vouch for you!</h2>
          <p className="text-type-light leading-tight mb-12">
            Just share the link below or let them scan the QR code to access
            Union and have them vouch for you.
          </p>
          <Input value={shareLink} readonly className="mb-4" />
          <Button full onClick={() => copyToClipboard(shareLink)}>
            {copied ? "Copied!" : "Copy link"}
          </Button>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={generateTwitterLink(shareLink)}
            className="btn btn-invert w-full relative mt-4"
          >
            <div className="btn-icon">
              <Twitter />
            </div>
            Share to Twitter
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href={generateTelegramLink(shareLink)}
            className="btn btn-invert w-full relative mt-4"
          >
            <div className="btn-icon">
              <Telegram />
            </div>
            Share to Telegram
          </a>
        </div>
      ) : (
        <form
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
          className="px-4 py-6 sm:px-6 sm:py-8"
        >
          <p className="mb-4">Ask someone to vouch for you</p>
          <Input
            chip="DAI"
            id="amount"
            label="Amount"
            name="amount"
            placeholder="0.00"
            ref={register}
            tip="Tip: You can leave this amount input open"
            type="number"
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
