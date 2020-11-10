import {
  useChooseDelegationModalOpen,
  useChooseDelegationModalToggle,
} from "./state";
import Modal, { ModalHeader } from "../../modal";
import { useWeb3React } from "@web3-react/core";
import useDelegate from "hooks/governance/useDelegate";
import getReceipt from "util/getReceipt";
import handleTxError from "util/handleTxError";
import { useDelegateVotingModalToggle } from "../DelegateVotingModal/state";
import useVotingWalletData from "hooks/governance/useVotingWalletData";
import { AddressZero } from "constants/variables";

const Manual = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 15c-3.998 0-12 2.003-12 6v3h24v-3c0-3.997-8.002-6-12-6z"
      fill="#F5A399"
    />
    <path
      opacity={0.4}
      d="M18 6c0 3.307-2.685 6-6 6S6 9.307 6 6c0-3.315 2.685-6 6-6s6 2.685 6 6z"
      fill="#F5A399"
    />
  </svg>
);

const Delegate = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2l-1.767 1.767 6.984 6.983H2v2.5h15.217l-6.984 6.983L12 22l10-10L12 2z"
      fill="#F5A399"
    />
  </svg>
);

const ChooseDelegationModal = () => {
  const open = useChooseDelegationModalOpen();
  const toggle = useChooseDelegationModalToggle();

  const delegateVotingModalToggle = useDelegateVotingModalToggle();

  const { account, library } = useWeb3React();

  const { data: votingWalletData } = useVotingWalletData(account);

  const isDelegating = Boolean(
    votingWalletData?.delegates !== "Self" &&
      votingWalletData?.delegates !== AddressZero
  );

  const delegate = useDelegate();

  const handleManualVoting = async () => {
    try {
      const { hash } = await delegate(account);

      if (open) toggle();

      await getReceipt(hash, library);
    } catch (err) {
      handleTxError(err);
    }
  };

  const handleDelegateVoting = () => {
    toggle();
    delegateVotingModalToggle();
  };

  return (
    <Modal isOpen={open} onDismiss={toggle}>
      <ModalHeader title="Choose delegation type" onDismiss={toggle} />
      <div className="px-2">
        <button
          onClick={handleManualVoting}
          className="px-4 py-6 flex w-full text-left focus:outline-none focus:shadow-outline space-x-6"
        >
          <div
            className="w-14 h-14 flex items-center justify-center rounded-full bg-white border"
            style={{ boxShadow: "0px 0px 16px #FBF4F4" }}
          >
            <Manual />
          </div>
          <div className="flex-1">
            <p className="font-semibold leading-tight">Manual Voting</p>

            {/* Spacer */}
            <div className="h-2" />

            <p className="text-sm font-medium leading-tight">
              This option allows you to vote on proposals directly from your
              connected wallet.
            </p>
          </div>
        </button>

        <div className="px-4">
          <div className="divider" />
        </div>

        <button
          onClick={handleDelegateVoting}
          className="px-4 py-6 flex w-full text-left focus:outline-none focus:shadow-outline space-x-6"
        >
          <div
            className="w-14 h-14 flex items-center justify-center rounded-full bg-white border"
            style={{ boxShadow: "0px 0px 16px #FBF4F4" }}
          >
            <Delegate />
          </div>
          <div className="flex-1">
            <p className="font-semibold leading-tight">
              Delegate your votes{" "}
              {isDelegating && (
                <span className="px-1 py-2px rounded bg-passed-light text-passed-pure font-semibold leading-tight text-sm">
                  Active
                </span>
              )}
            </p>

            {/* Spacer */}
            <div className="h-2" />

            <p className="text-sm font-medium leading-tight">
              This options allows you to delegate your votes to another Ethereum
              address. You never send UNION, only your voting rights, and can
              undelegate at any time.
            </p>
          </div>
        </button>

        <div className="px-4">
          <div className="divider"></div>
        </div>

        {/* Spacer */}
        <div className="h-8" />
      </div>
    </Modal>
  );
};

export default ChooseDelegationModal;
