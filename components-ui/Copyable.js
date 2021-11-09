import useCopy from "hooks/useCopy";

export function Copyable({ value, children }) {
  const [isCopied, copy] = useCopy(2000);
  return (
    <span onClick={() => copy(value)} className="copyable">
      {isCopied ? "Copied" : children}
    </span>
  );
}
