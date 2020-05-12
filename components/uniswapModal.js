import { DialogContent, DialogOverlay } from "@reach/dialog";
import useCurrentToken from "hooks/useCurrentToken";
import { useState, useEffect } from "react";
import Spinner from "./spinner";

const UniswapModal = ({ isOpen, onDismiss, label = "Uniswap", ...rest }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return () => {
      setLoading(true);
    };
  }, [isOpen]);

  const ADDRESS = useCurrentToken("UNION");
  const AMOUNT = 50;

  const URL = `https://uniswap.exchange/swap?exactField=output&exactAmount=${AMOUNT}&outputCurrency=`;

  return (
    <DialogOverlay isOpen={isOpen} onDismiss={onDismiss}>
      <DialogContent className="uniswap" aria-label={label} {...rest}>
        {loading && (
          <div className="centered">
            <Spinner />
          </div>
        )}
        <iframe
          onLoad={() => setLoading(false)}
          src={URL}
          height="660px"
          width="100%"
          className={loading ? "hidden" : undefined}
        />
      </DialogContent>
    </DialogOverlay>
  );
};

export default UniswapModal;
