import { useGetInvitedModalToggle } from "@contexts/Vouch";
import Button from "./button";

const ApplicationCard = () => {
  const toggleGetInvitedModal = useGetInvitedModalToggle();

  return (
    <div className="bg-pink-light border border-pink-pure rounded p-4 md:p-6 mb-10">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-lg leading-snug mb-2">Become a member of Union</p>
          <p className="text-xl font-normal">
            <strong className="font-semibold">0 out of 3 members</strong>{" "}
            vouched for you
          </p>
        </div>
        <Button onClick={toggleGetInvitedModal}>
          Ask someone to vouch for you
        </Button>
      </div>

      <div className="my-6 h-5 bg-pink-pure rounded-full w-1/2"></div>

      <p>
        <button
          onClick={toggleGetInvitedModal}
          className="underline font-medium"
        >
          What is vouching?
        </button>
      </p>

     
    </div>
  );
};

export default ApplicationCard;
