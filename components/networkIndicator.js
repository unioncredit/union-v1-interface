import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";

const NETWORKS = {
  1: { name: "Mainnet", color: "bg-mainnet" },
  3: { name: "Ropsten", color: "bg-ropsten" },
  4: { name: "Rinkeby", color: "bg-rinkeby" },
  5: { name: "Görli", color: "bg-goerli" },
  42: { name: "Kovan", color: "bg-kovan" },
  1336: { name: "localhost", color: "bg-white" },
};

const NetworkDot = ({ color }) => {
  const cachedClassNames = classNames(color, "h-2 w-2 rounded-full");
  return <div className={cachedClassNames} />;
};

const NetworkIndicator = () => {
  const { chainId } = useWeb3React();

  if (chainId === 1 || !chainId) return null;

  return (
    <div className="indicator pointer-events-none">
      <div className="px-4 py-3 rounded-full font-semibold items-center text-sm bg-black-pure shadow-lg text-white flex">
        <NetworkDot color={NETWORKS[chainId].color} />
        <p className="ml-2 leading-none">{NETWORKS[chainId].name}</p>
      </div>
    </div>
  );
};

export default NetworkIndicator;
