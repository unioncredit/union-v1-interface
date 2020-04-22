import useCurrentToken from "@hooks/useCurrentToken";
import { getErc20Balance } from "@lib/contracts/getErc20Balance";
import { verifyMembership } from "@lib/contracts/verifyMembership";
import { useWeb3React } from "@web3-react/core";
import { useAutoCallback, useAutoEffect } from "hooks.macro";
import { useState } from "react";
import Button from "./button";
import LabelPair from "./labelPair";
import Modal, { ModalHeader } from "./modal";

const ApplicationModal = ({ isOpen, onDismiss }) => {
  const { account, library, chainId } = useWeb3React();

  const FEE = 10;

  const DAI_ADDRESS = useCurrentToken("DAI");

  const UNION_ADDRESS = useCurrentToken("UNION");

  const [unionBalance, setUnionBalance] = useState(" ");

  useAutoEffect(() => {
    let isMounted = true;

    const getUnionBalance = async () => {
      try {
        if (isMounted) {
          if (library && account) {
            const res = await getErc20Balance(
              UNION_ADDRESS,
              library.getSigner(),
              chainId
            );

            setUnionBalance(res.toFixed(3));
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    };

    getUnionBalance();

    return () => {
      isMounted = false;
    };
  });

  const submit = useAutoCallback(async () => {
    try {
      await verifyMembership(
        account,
        DAI_ADDRESS,
        library.getSigner(),
        chainId
      );
    } catch (err) {}
  });

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <ModalHeader title="Become a member" onDismiss={onDismiss} />

      <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6">
        <p>
          You've collected all three vouches and are ready to become a member.
        </p>

        <LabelPair
          className="mt-4"
          label="Wallet Balance"
          value={unionBalance}
          valueType="UNION"
        />

        <LabelPair
          className="mt-8 mb-4"
          label="Membership Fee"
          value={FEE}
          valueType="UNION"
        />

        <div className="divider"></div>

        <div className="mt-6">
          <Button full onClick={submit}>
            Submit application
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ApplicationModal;
