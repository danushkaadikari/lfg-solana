import React from "react";
import Liquidity from "./Liquidity";
import APRDisplay from "../APRDisplay";
import FarmingActions from "./FarmingActions";
import { APRLength } from "@/lib/types";

const RewardTokenSOL = () => {
  const aprLengths = [
    { length: "Length 1", value: "3.84%" },
    { length: "Length 2", value: "3.99%" },
    { length: "Length 3", value: "4.11%" },
  ];
  const liquidity = "$1380217.06";
  const [selectedAPR, setSelectedAPR] = React.useState<APRLength | null>(null);

  return (
    <article className="flex flex-col justify-center items-start p-5 md:p-8 w-full bg-black bg-opacity-30 rounded-3xl md:rounded-4xl mb-4">
      <h2 className="text-2xl md:text-3xl xl:text-4xl text-center text-neutral-200">
        LFY/SOL
      </h2>
      <p className="self-stretch mt-5 md:mt-8 text-sm sm:text-base md:text-lg xl:text-xl leading-6 text-neutral-500 w-full md:w-4/5 xl:w-3/4">
        Enter farms that provide liquidity to each token. There is a 1% entry
        fee.
      </p>
      <div className="flex flex-wrap gap-5 md:gap-8 mt-5 md:mt-8 text-center">
        <APRDisplay
          selectedAPR={selectedAPR}
          setSelectedAPR={setSelectedAPR}
          aprLengths={aprLengths}
        />
        <Liquidity balance={liquidity} />
      </div>
      <FarmingActions
        onDeposit={() => {}}
        onRemove={() => {}}
        onClaim={() => {}}
      />
    </article>
  );
};

export default RewardTokenSOL;
