import React from "react";

import DashboardLayout from "@/components/dashboard-layout";
import LFGSOL from "@/components/farms/LFG_SOL";
import RewardTokenSOL from "@/components/farms/RewardToken_SOL";
import RewardTokenLFG from "@/components/farms/RewardToken_LFG";

const FarmingPage = () => {
  return (
    <DashboardLayout>
      <div className="w-full flex overflow-hidden flex-col p-3 md:p-5 xl:p-8 font-semibold leading-none ">
        <h1 className="self-start text-3xl md:text-4xl xl:text-5xl text-center text-neutral-200">
          Farms
        </h1>
        <section className="w-full flex flex-col mt-6 sm:mt-8 md:mt-10 xl:mt-12">
          <LFGSOL />
          <RewardTokenSOL />
          <RewardTokenLFG />
        </section>
      </div>
    </DashboardLayout>
  );
};

export default FarmingPage;
