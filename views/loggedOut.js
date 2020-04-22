import { useWalletModalToggle } from "@contexts/Application";
import Button from "@components/button";

export default function LoggedOutView() {
  const toggleWalletModal = useWalletModalToggle();

  return (
    <div className="bg-white border max-w-md mx-auto rounded p-4 sm:p-6 md:p-8 text-center mb-32 md:mb-64">
      <div className="flex justify-center">
        <img src="/images/logged-out.svg" alt="" />
      </div>

      <h1 className="mb-4 mt-6">Join Union</h1>
      <p className="text-lg leading-6 text-grey-pure mb-8">
        Borrow tokens with no collateral, vouch for other people and earn higher
        interest when staking.
      </p>

      <Button onClick={toggleWalletModal} full>
        Start now
      </Button>

      <p className="mt-4">
        Already have an account?{" "}
        <button className="underline font-medium" onClick={toggleWalletModal}>
          Sign in
        </button>
      </p>
    </div>
  );
}
