import { getWalletIcon, getWalletName } from "util/formatWalletDetails";
import Button from "../button";

const WalletOption = ({ name, activating, disabled, onClick }) => (
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
);

export default WalletOption;
