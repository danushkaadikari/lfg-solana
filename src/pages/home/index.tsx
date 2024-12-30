import React from "react";
import DashboardLayout from "@/components/dashboard-layout";
import MarketCapSection from "@/components/home/MarketCapSection";
import NewsSection from "@/components/home/NewsSection";
import RewardTokenMarketCapSection from "@/components/home/RewardTokenMarketCapSection";
import TVLSection from "@/components/home/TVLSection";

const index = () => {
  return (
    <DashboardLayout>
      <div className="flex overflow-hidden flex-col px-3 sm:px-5 md:px-8 leading-none text-center  text-neutral-200 max-md:max-w-full">
        <h1 className="self-start text-3xl md:text-4xl xl:text-5xl font-semibold ">
          Home
        </h1>
        <NewsSection />
        <MarketCapSection />
        <RewardTokenMarketCapSection />
        <TVLSection />
      </div>
    </DashboardLayout>
  );
};

export default index;
