import { useEffect, useState } from "react";

const NETWORKS = {
  1: { name: "Mainnet", logo: "/images/ethereum-logo.png" },
  137: { name: "Polygon", logo: "/images/polygon-logo.png" },
};

const MetamaskNetworkIndicator = () => {
  const [metamaskChainId, setMetamaskChainId] = useState(
    // eslint-disable-next-line
    parseInt(ethereum.chainId)
  );

  useEffect(() => {
    // eslint-disable-next-line
    ethereum.on("chainChanged", (chainId) => {
      setMetamaskChainId(parseInt(chainId));
    });
  });

  if (metamaskChainId !== 1 && metamaskChainId !== 137) return null;

  return (
    <div className="btn btn-network">
      {NETWORKS[metamaskChainId] ? (
        <div className="icon-wrapper">
          <img className="icon" src={NETWORKS[metamaskChainId].logo} />
        </div>
      ) : null}
      <p>{NETWORKS[metamaskChainId]?.name || "Unknown network"}</p>
    </div>
  );
};

export default MetamaskNetworkIndicator;
