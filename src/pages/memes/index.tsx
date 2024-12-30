import React from "react";

import DashboardLayout from "@/components/dashboard-layout";
import StakeMemeCoins from "@/components/memecoins/StakeMemeCoins";

const MemeCoins = () => {
  return (
    <DashboardLayout>
      <div className="w-full flex overflow-hidden flex-col p-3 sm:p-5 md:p-8 font-semibold leading-none ">
        <h1 className="self-start text-3xl md:text-4xl xl:text-5xl text-center text-neutral-200">
          Memecoins
        </h1>
        <section className="flex flex-col mt-5 sm:mt-8 md:mt-10 xl:mt-12 w-full">
          <StakeMemeCoins />
        </section>
      </div>
    </DashboardLayout>
  );
};

export default MemeCoins;
