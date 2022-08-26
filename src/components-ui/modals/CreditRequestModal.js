import { useWeb3React } from "@web3-react/core";
import {
  ModalOverlay,
  Box,
  Label,
  Button,
  Card,
  ButtonRow,
  Select,
} from "@unioncredit/ui";
import { ReactComponent as Twitter } from "@unioncredit/ui/lib/icons/twitter.svg";
import { ReactComponent as Telegram } from "@unioncredit/ui/lib/icons/telegram.svg";

import useENS from "hooks/useENS";
import generateLink, {
  generateTelegramLink,
  generateTwitterLink,
} from "util/generateLink";
import { Modal } from "components-ui";
import { Copyable } from "components-ui/Copyable";
import ShareQrCode from "components-ui/ShareQrCode";
import { useModal, useModalOpen } from "hooks/useModal";
import useIsMobile from "hooks/useIsMobile";
import { options } from "util/switchChain";
import { useState } from "react";
import { networkAppUrls } from "lib/connectors";
import useCopy from "hooks/useCopy";

export const CREDIT_REQUEST_MODAL = "credit-request-modal";

export const useCreditRequestModal = () => useModal(CREDIT_REQUEST_MODAL);

export const useCreditRequestModalOpen = () =>
  useModalOpen(CREDIT_REQUEST_MODAL);

export function CreditRequestModal() {
  const [selectedChainId, setChainId] = useState(null);
  const { close } = useCreditRequestModal();
  const { account, chainId } = useWeb3React();
  const { name } = useENS(account);

  const [isCopied, copy] = useCopy();
  const isMobile = useIsMobile();
  const isOpen = useCreditRequestModalOpen();

  if (!isOpen) return null;

  const url = generateLink(name || account, selectedChainId);

  const defaultValueIndex = options.findIndex(
    (option) => option.chainId === chainId
  );

  const handleChange = (value) => {
    setChainId(value.chainId);
  };

  return (
    <ModalOverlay onClick={close}>
      <Modal title="Vouch QR Code" onClose={close}>
        <Select
          options={options}
          onChange={handleChange}
          defaultValue={!!~defaultValueIndex && options[defaultValueIndex]}
        />
        <Card packed mt="8px">
          <Box my="16px" fluid justify="center">
            <ShareQrCode link={url} />
          </Box>
          <Box mb="16px" direction="vertical" align="center">
            <Label
              as="p"
              m={0}
              style={{
                wordBreak: "break-all",
                textAlign: "center",
                padding: "0 10px",
              }}
            >
              {url}
            </Label>
            <Button
              mt="8px"
              variant="pill"
              onClick={() => copy(url)}
              label={isCopied ? "Copied" : "Copy link"}
            />
          </Box>
        </Card>
        <ButtonRow fluid mt="8px">
          <Button
            fluid
            as="a"
            color="blue"
            variant="secondary"
            icon={Twitter}
            label={isMobile ? null : "Twitter"}
            href={generateTwitterLink(url)}
          />
          <Button
            fluid
            as="a"
            color="blue"
            variant="secondary"
            icon={Telegram}
            label={isMobile ? null : "Telegram"}
            href={generateTelegramLink(url)}
          />
        </ButtonRow>
      </Modal>
    </ModalOverlay>
  );
}
