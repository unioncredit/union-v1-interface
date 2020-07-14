import { getWalletIcon, getWalletName } from "util/formatWalletDetails";
import Button from "../button";

const WalletOption = ({ name, activating, disabled, onClick }) => (
  <div className="mt-4" key={name}>
    <Button
      full
      icon={getWalletIcon(name)}
      invert
      onClick={onClick}
      disabled={disabled}
      submitting={activating}
    >
      {getWalletName(name)}
    </Button>
  </div>
);

export default WalletOption;
