import React from "react";

interface LiquidityProps {
  balance: string;
}

const Liquidity: React.FC<LiquidityProps> = ({ balance }) => {
  return (
    <div className="flex overflow-hidden flex-col items-center p-4 rounded-2xl bg-neutral-900 min-w-[240px]">
      <h3 className="text-2xl text-neutral-200">Liquidity</h3>
      <div className="flex flex-col items-center mt-4">
        <div className="text-3xl text-neutral-200">{balance}</div>
        <p className="text-lg text-neutral-500">Of pair</p>
      </div>
    </div>
  );
};

export default Liquidity;
