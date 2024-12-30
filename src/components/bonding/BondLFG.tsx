import React from "react";
import BondPricesDisplay from "./BondPricesDisplay";
import BondingActions from "./BondingActions";

const BondLFG = () => {
  const bondPrices = [
    { title: "Market Price", value: "1000$" },
    { title: "Bond Price", value: "700$" },
    { title: "Discount Rate", value: "30%" },
  ];

  return (
    <article className="flex flex-col justify-center items-start p-5 md:p-8 w-full bg-black bg-opacity-30 rounded-3xl md:rounded-4xl mb-4">
      <h2 className="text-2xl md:text-3xl xl:text-4xl text-center text-neutral-200">
        Bond $LFG
      </h2>
      <p className="self-stretch mt-5 md:mt-8 text-sm sm:text-base md:text-lg xl:text-xl leading-6 text-neutral-500 w-full md:w-4/5 xl:w-3/4">
        Bond the $LFG token at a discount. Holders will get a 30% discount when
        using USDT, Memecoins, SOL, or USDC to bond.
      </p>
      <div className="flex flex-wrap gap-8 mt-8 text-center max-md:max-w-full">
        <BondPricesDisplay bondPrices={bondPrices} />
      </div>
      <BondingActions onBond={() => {}} />
    </article>
  );
};

export default BondLFG;
