import { formatUnits } from "@ethersproject/units";
import useCurrentToken from "@hooks/useCurrentToken";
import useMemberContract from "@hooks/useMemberContract";
import useTokenBalance from "@hooks/useTokenBalance";
import { verifyMembership } from "@lib/contracts/verifyMembership";
import { useWeb3React } from "@web3-react/core";
import { useAutoCallback, useAutoEffect } from "hooks.macro";
import { useState } from "react";
import Button from "./button";
import LabelPair from "./labelPair";
import Modal, { ModalHeader } from "./modal";

const parseRes = (res, decimals = 2) =>
  Number(formatUnits(res, 18)).toFixed(decimals);

const ApplicationModal = ({ isOpen, onDismiss }) => {
  const { account, library, chainId } = useWeb3React();

  const DAI = useCurrentToken("DAI");
  const UNION = useCurrentToken("UNION");

  const [fee, setFee] = useState(0);

  const unionBalance = useTokenBalance(UNION);

  const memberContract = useMemberContract();

  useAutoEffect(() => {
    let isMounted = true;

    const getMemberFee = async () => {
      try {
        if (isMounted) {
          const res = await memberContract.newMemberFee();
          setFee(parseRes(res, 2));
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
        }
      }
    };

    getMemberFee();

    return () => {
      isMounted = false;
    };
  });

  const submit = useAutoCallback(async () => {
    try {
      await verifyMembership(account, DAI, library.getSigner(), chainId);
    } catch (err) {
      console.error(err);
    }
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
          value={Number(unionBalance).toFixed(2)}
          valueType="UNION"
        />

        <LabelPair
          className="mt-8 mb-4"
          label="Membership Fee"
          value={fee}
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
