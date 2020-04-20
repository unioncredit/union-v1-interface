import Bell from "../svgs/Bell";

const Activity = () => {
  /**
   * @todo Hook up if there are pending new notifications
   */
  const pending = false;

  return (
    <button className="h-8 w-8 bg-white items-center justify-center inline-flex rounded focus:outline-none focus:shadow-outline">
      <Bell pending={pending} />
    </button>
  );
};

export default Activity;
