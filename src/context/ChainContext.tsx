import React, { createContext, useContext, useState, ReactNode } from "react";

interface ChainContextProps {
  activeChain: string;
  setActiveChain: (chain: string) => void;
}

const ChainContext = createContext<ChainContextProps | undefined>(undefined);

export const ChainProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeChain, setActiveChain] = useState("Ethereum");

  const value = React.useMemo(
    () => ({ activeChain, setActiveChain }),
    [activeChain, setActiveChain]
  );

  return (
    <ChainContext.Provider value={value}>{children}</ChainContext.Provider>
  );
};

export const useChain = (): ChainContextProps => {
  const context = useContext(ChainContext);
  if (!context) {
    throw new Error("useChain must be used within a ChainProvider");
  }
  return context;
};
