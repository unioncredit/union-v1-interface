import Spinner from "svgs/Spinner";
import { useState, useEffect, useRef } from "react";
import { injected } from "lib/connectors";

const MetamaskSwitcher = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [metamaskChainId, setMetamaskChainId] = useState(
    // eslint-disable-next-line
    parseInt(ethereum.chainId)
  );

  const timer = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line
    ethereum.on("chainChanged", (chainId) => {
      setMetamaskChainId(parseInt(chainId));
    });
  }, []);

  const handleChangeNetwork = async () => {
    setIsLoading(true);
    try {
      // eslint-disable-next-line
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
              {
                chainId: "0x89",
                rpcUrls: ["https://rpc-mainnet.matic.network"],
                chainName: "Matic(Polygon) Mainnet",
                nativeCurrency: {
                  name: "Matic",
                  symbol: "MATIC",
                  decimals: 18,
                },
              },
            ],
          });
        } catch (e) {
          console.error("Error while changing network", e);
        }
      }
    }
    timer.current = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      // clean up the timer when the component un-mounts
      timer.current && clearTimeout(timer.current);
    };
  }, []);

  if (injected.supportedChainIds.includes(metamaskChainId)) return null;

  return (
    <div className="network-switch-wrapper rounded py-4">
      <div className="flex mb-3">
        <div className="h-2 w-2 rounded-full bg-unsupported m-auto mr-0"></div>
        <div className="text-sm m-auto ml-3 font-medium">
          Ethereum Mainnet not supported
        </div>
      </div>
      <button
        className={`network-switch-button rounded flex mx-auto px-3 py-2 ${
          isLoading ? "disabled pointer-events-none" : ""
        }`}
        onClick={handleChangeNetwork}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Spinner className="icon h-6 my-auto" />
            <div className="text-base ml-2.5 font-medium">
              Switching Network
            </div>
          </>
        ) : (
          <>
            <img className="icon h-4 my-auto" src="/images/polygon-logo.png" />
            <div className="text-base ml-2.5 font-medium">
              Switch to Polygon
            </div>
          </>
        )}
      </button>
    </div>
  );
};

export default MetamaskSwitcher;
