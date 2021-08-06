import { getWalletIcon } from "util/formatWalletDetails";
import Button from "../../../button";
import { useState } from "react";

const ChangeNetwork = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeNetwork = async () => {
    setIsLoading(true);
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x89" }],
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              { chainId: "0x89", rpcUrl: "https://rpc-mainnet.matic.network" },
            ],
          });
        } catch (e) {
          console.error("Error while changing network", e);
        }
      }
    }
    setIsLoading(false);
  };
  return (
    <Button
      full
      icon={getWalletIcon("MetaMask")}
      invert
      onClick={handleChangeNetwork}
      disabled={isLoading}
      submitting={isLoading}
      submittingText="Changing network"
    >
      <div className="mx-auto">Change Metamask network</div>
    </Button>
  );
};

export default ChangeNetwork;
