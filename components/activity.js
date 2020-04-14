import Bell from "../svgs/Bell";

const Activity = () => {
  const pending = true;

  return (
    <button className="h-8 w-8 bg-white items-center justify-center inline-flex rounded focus:outline-none focus:shadow-outline">
      <Bell pending={pending} />
    </button>
  );
};

export default Activity;
