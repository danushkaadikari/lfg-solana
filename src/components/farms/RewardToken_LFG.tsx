import React from "react";
import Liquidity from "./Liquidity";
import APRDisplay from "../APRDisplay";
import FarmingActions from "./FarmingActions";
import { APRLength } from "@/lib/types";

const RewardTokenLFG = () => {
  const aprLengths = [
    { length: "Length 1", value: "3.84%" },
    { length: "Length 2", value: "3.99%" },
    { length: "Length 3", value: "4.11%" },
  ];
  const liquidity = "$1380217.06";
  const [selectedAPR, setSelectedAPR] = React.useState<APRLength | null>(null);

  return (
    <article className="flex flex-col justify-center items-start p-8 w-full bg-black bg-opacity-30 rounded-[30px] max-md:px-5 max-md:max-w-full mb-4">
      <h2 className="text-2xl md:text-3xl xl:text-4xl text-center text-neutral-200">
        LFY/LFG
      </h2>
      <p className="self-stretch mt-5 md:mt-8 text-sm sm:text-base md:text-lg xl:text-xl leading-6 text-neutral-500 w-full md:w-4/5 xl:w-3/4">
        Enter farms that provide liquidity to each token. There is a 1% entry
        fee.
      </p>
      <div className="flex flex-wrap gap-8 mt-8 text-center max-md:max-w-full">
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

export default RewardTokenLFG;
