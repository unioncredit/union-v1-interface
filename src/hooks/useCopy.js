import { useEffect, useCallback, useState } from "react";
import { useCopyToClipboard } from "react-use";

export default function useCopy(timeout = 1000) {
  const [, copyToClipboard] = useCopyToClipboard();

  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback((text) => {
    copyToClipboard(text);
    setIsCopied(true);
  }, []);

  useEffect(() => {
    if (isCopied) {
      const hide = setTimeout(() => {
        setIsCopied(false);
      }, timeout);

      return () => {
        clearTimeout(hide);
      };
    }
  }, []);

  return [isCopied, copy];
}
