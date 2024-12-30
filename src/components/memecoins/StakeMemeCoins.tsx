import React from "react";
import StakingActions from "./StakingActions";
import UserStakedBalance from "../UserStakedBalance";
import APRDisplay from "../APRDisplay";
import MemecoinsSelector from "./MemecoinsSelector";
import { APRLength } from "@/lib/types";

const StakeMemeCoins = () => {
  const aprLengths = [
    { value: "3.84%" },
    { value: "3.99%" },
    { value: "4.11%" },
  ];
  const userStakedBalance = "$1380217.06";

  const [selectedMemecoin, setSelectedMemecoin] = React.useState<string | null>(
    null
  );

  const [selectedAPR, setSelectedAPR] = React.useState<APRLength | null>(null);

  return (
    <section className="flex flex-col justify-center items-start p-8 w-full bg-black bg-opacity-30 rounded-[30px] max-md:px-5 max-md:max-w-full">
      <h1 className="text-2xl md:text-3xl xl:text-4xl text-center text-neutral-200">
        Stake Memecoins
      </h1>
      <p className="self-stretch mt-5 md:mt-8 text-sm sm:text-base md:text-lg xl:text-xl leading-6 text-neutral-500 max-md:max-w-full">
        Gives the ability to stake a wide variety of memecoins. Fee of 5% to
        enter and 5% to exit.
      </p>
      <div className="flex flex-wrap gap-5 mt-8 max-w-full text-center w-full md:w-4/5 xl:w-2/3">
        <APRDisplay
          selectedAPR={selectedAPR}
          setSelectedAPR={setSelectedAPR}
          aprLengths={aprLengths}
        />
        <UserStakedBalance balance={userStakedBalance} />
        <MemecoinsSelector
          selectedMemecoin={selectedMemecoin}
          onMemecoinSelect={setSelectedMemecoin}
        />
      </div>
      <StakingActions
        onStake={() => {}}
        onUnstake={() => {}}
        onClaim={() => {}}
      />
    </section>
  );
};

export default StakeMemeCoins;
