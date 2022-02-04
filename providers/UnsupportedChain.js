import { useContext, createContext } from "react";

const Context = createContext([]);

export const useUnsupportedChains = () => useContext(Context);

// Provide an array of unsupported chain IDs. This is usefull
// for handling situations where a feature is not supported on
// a certain chain. For example governance on L2
export default function UnsuportedChainProvider({ children, chainIds }) {
  return <Context.Provider value={chainIds}>{children}</Context.Provider>;
}

export function withUnsupportedChains(Component, chainIds) {
  return (props) => {
    return (
      <UnsuportedChainProvider chainIds={chainIds}>
        <Component {...props} />
      </UnsuportedChainProvider>
    );
  };
}
