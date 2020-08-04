import useCopy from "hooks/useCopy";
import Button from "./button";

const VouchLink = ({ link }) => {
  const [copied, copy] = useCopy();
  const handleOnClick = () => copy(link);

  return (
    <div className="flex items-stretch space-x-2">
      <div className="flex-1">
        <input
          autoCapitalize="off"
          autoCorrect="off"
          className="w-full pl-4 h-full rounded border border-pink-pure bg-white focus:shadow-input focus:outline-none transition-all duration-150 text-lg leading-snug text-overflow-clip"
          readOnly
          spellCheck="false"
          type="text"
          value={link}
        />
      </div>
      <div className="w-1/3">
        <Button full className="px-0" onClick={handleOnClick}>
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );
};

export default VouchLink;
