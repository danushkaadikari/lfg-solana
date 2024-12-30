import React from "react";
import DashboardLayout from "@/components/dashboard-layout";
import BondLFG from "@/components/bonding/BondLFG";
import BondingHistory from "@/components/bonding/BondingHistory";

const BondingPage = () => {
  return (
    <DashboardLayout>
      <div className="w-full flex overflow-hidden flex-col p-3 md:p-5 xl:p-8 font-semibold leading-none">
        <h1 className="self-start text-3xl md:text-4xl xl:text-5xl text-center text-neutral-200">
          Bonding
        </h1>
        <section className="flex flex-col mt-5 sm:mt-8 md:mt-10 xl:mt-12 w-full">
          <BondLFG />
          <BondingHistory />
        </section>
      </div>
    </DashboardLayout>
  );
};

export default BondingPage;
