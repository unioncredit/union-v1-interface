import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { network as networkConnector } from "lib/connectors";

const NETWORKS = {
  1: { name: "Mainnet", color: "bg-mainnet" },
  3: { name: "Ropsten", color: "bg-ropsten" },
  4: { name: "Rinkeby", color: "bg-rinkeby" },
  5: { name: "Görli", color: "bg-goerli" },
  42: { name: "Kovan", color: "bg-kovan" },
  137: { name: "Polygon", color: "bg-polygon" },
  80001: { name: "Mumbai", color: "bg-mumbai" },
  1336: { name: "localhost", color: "bg-white" },
};

const NetworkDot = ({ color }) => {
  const cachedClassNames = classNames(color, "h-2 w-2 rounded-full");
  return <div className={cachedClassNames} />;
};

const NetworkIndicator = () => {
  const { chainId: web3ReactChainId, connector } = useWeb3React();

  const [chainId, setChainId] = useState(0);

  useEffect(() => {
    if (typeof ethereum !== "undefined") {
      // eslint-disable-line no-undef
      setChainId(parseInt(ethereum.chainId)); // eslint-disable-line no-undef
      ethereum.on("chainChanged", (metamaskChainId) => {
        // eslint-disable-line no-undef
        setChainId(parseInt(metamaskChainId));
      });
    }
  }, []);

  useEffect(() => {
    if (connector && connector !== networkConnector) {
      setChainId(parseInt(web3ReactChainId));
    }
  }, [web3ReactChainId, connector]);

  if (chainId === 1 || chainId === 137 || !chainId) return null;

  return (
    <div className="py-3 flex justify-center font-semibold text-center text-sm bg-black-pure text-white select-none">
      <div className="flex items-center mx-auto">
        <NetworkDot color={NETWORKS[chainId].color} />
        <p className="ml-3 leading-none">{NETWORKS[chainId].name}</p>
      </div>
    </div>
  );
};

export default NetworkIndicator;
