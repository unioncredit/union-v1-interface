import { useRouter } from "next/router";
import LinkArrow from "svgs/LinkArrow";

const Back = () => {
  const { back } = useRouter();

  const handleOnClick = () => back();

  return (
    <button
      onClick={handleOnClick}
      className="font-semibold inline-flex align-middle items-center focus:outline-none"
    >
      <LinkArrow.Left /> <span className="ml-1">Back</span>
    </button>
  );
};

export default Back;
