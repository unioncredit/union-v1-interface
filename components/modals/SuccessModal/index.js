import { commify } from "@ethersproject/units";
import TweetButton from "components/TweetButton";
import useCreditLimit from "hooks/useCreditLimit";
import usePopConfetti from "hooks/usePopConfetti";
import Modal, { CloseButton } from "../../modal";
import { useSuccessModalOpen, useSuccessModalToggle } from "./state";

const TWEET = `https://twitter.com/intent/tweet?url=https%3A%2F%2Funion.finance&via=unionprotocol&text=${encodeURIComponent(
  "I just became a Union member giving me instant access to credit without collateral. Apply to join the Union."
)}`;

const SuccessModal = () => {
  const open = useSuccessModalOpen();
  const toggle = useSuccessModalToggle();

  const { data: creditLimit = 0 } = useCreditLimit();

  usePopConfetti(open);

  return (
    <Modal wide isOpen={open} onDismiss={toggle}>
      <div className="px-4 sm:px-6 pb-6 sm:pb-12 pt-8 sm:pt-12 text-center relative">
        <div className="absolute right-0 top-0 mr-4 mt-4">
          <CloseButton onClick={toggle} large />
        </div>

        <div className="mb-12">
          <h2 className="text-3xl mb-6">
            <span role="img" aria-label="Party Popper">
              🎉
            </span>{" "}
            Congrats!{" "}
            <span role="img" aria-label="Confetti ball">
              🎊
            </span>
          </h2>

          <p className="text-2xl font-semibold mb-8">
            You're now a member of Union.
          </p>

          <p className="text-lg mb-2">You now have the ability to:</p>

          <ul className="text-lg">
            <li className="mb-2">
              Borrow up to <strong>{commify(creditLimit)} DAI</strong>
            </li>
            <li>
              Vouch for your <strong>trusted friends</strong>
            </li>
          </ul>
        </div>

        <TweetButton href={TWEET}>I just became a member!</TweetButton>
      </div>
    </Modal>
  );
};

export default SuccessModal;
