import { useEffect, useState } from "react";

const NETWORKS = {
  1: { name: "Mainnet", logo: "/images/ethereum-logo.png" },
  3: { name: "Ropsten", logo: "/images/ethereum-logo.png" },
  4: { name: "Rinkeby", logo: "/images/ethereum-logo.png" },
  5: { name: "Görli", logo: "/images/ethereum-logo.png" },
  42: { name: "Kovan", logo: "/images/ethereum-logo.png" },
  137: { name: "Polygon", logo: "/images/polygon-logo.png" },
  80001: { name: "Mumbai", logo: "/images/polygon-logo.png" },
  1336: { name: "localhost", logo: "/images/ethereum-logo.png" },
};

const MetamaskNetworkIndicator = () => {
  // eslint-disable-next-line
  const [metamaskChainId, setMetamaskChainId] = useState(
    parseInt(ethereum.chainId)
  );

  useEffect(() => {
    // eslint-disable-next-line
    ethereum.on("chainChanged", (chainId) => {
      setMetamaskChainId(parseInt(chainId));
    });
  });

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
