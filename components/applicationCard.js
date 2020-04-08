import Button from "./button";

const ApplicationCard = (props) => {
  const c = 1;
  return (
    <div className="bg-pink-light border border-pink-pure rounded p-4 md:p-6 mb-10">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-lg leading-snug mb-2">Become a member of Union</p>
          <p className="text-xl font-normal">
            <strong className="font-semibold">{props.count} out of 3 members</strong>{" "}
            vouched for you
          </p>
        </div>
        <Button>Ask someone to vouch for you</Button>
      </div>

      <div className="my-6 h-5 bg-pink-pure rounded-full w-1/3"></div>

      <p>
        <button className="underline font-medium">What is vouching?</button>
      </p>
    </div>
  );
};

export default ApplicationCard;
