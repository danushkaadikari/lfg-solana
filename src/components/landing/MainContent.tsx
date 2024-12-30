import React from "react";
import TitleSection from "./TitleSection";
import InfoSquares from "./InfoSquares";
import FuturePlans from "./FuturePlans";
import GrowthStrategy from "./GrowthStrategy";

const MainContent = () => {
  return (
    <main className="flex overflow-hidden flex-col w-full max-md:max-w-full">
      <TitleSection />
      <div className="absolute inset-0 -z-[1]  min-h-[100px] w-full">
        <img
          className="size-full object-cover origin-top !min-h-[2000px] w-full"
          src="/images/home-bg.svg"
          alt="home-bg"
        />
      </div>
      <div className="-mt-10 -z-10 flex overflow-hidden flex-col justify-center items-center w-full max-md:px-5 max-md:max-w-full">
        <div className="flex max-w-full h-[300px] sm:h-[400] md:h-[500px] xl:h-[700px] rounded-3xl w-full sm:w-11/12 md:w-5/6 xl:w-3/4">
          <img
            className="size-full object-contain aspect-square"
            src="/images/hero_bg.gif"
            alt="hero bg"
          />
        </div>
      </div>
      <InfoSquares />
      <GrowthStrategy />
      <FuturePlans />
    </main>
  );
};

export default MainContent;
