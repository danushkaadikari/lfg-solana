import React from "react";
import EnterAppBtn from "../common/EnterAppBtn";

const GrowthStrategy = () => {
  return (
    <section className="flex z-20 overflow-hidden flex-col justify-center items-center px-5 md:px-8 lg:px-10 xl:px-12 pt-6 pb-10 md:pb-16 xl:pb-24 font-medium text-pretty text-center max-md:px-5 gapy-5 md:gap-7 xl:gap-y-8">
      <div className="flex flex-col items-center max-w-full w-full sm:w-11/12 md:w-4/5 xl:w-2/3 mb-5 md:mb-8">
        <h2 className="text-3xl md:text-4xl leading-none text-neutral-800">
          Growth Strategy:
        </h2>
        <p className="mt-4 text-sm sm:text-base md:text-lg xl:text-xl leading-5 md:leading-7 text-pretty text-stone-500 max-md:max-w-full">
          We believe meme coins currently own the attention economy, and the
          greatest potential lies with protocols that can facilitate and provide
          utility to these fanatical communities. LFG plans to cross pollinate
          and partner with as many of these communities as we can. Because
          there&apos;s currently no risk free way to earn a yield on meme coins,
          we expect this to be a very easy sell. With just a small percentage of
          these communities staked in our protocol, we expect revenues to be
          significant.
        </p>
      </div>
      <EnterAppBtn className="h-10 md:h-11 lg:h-12 px-5 lg:px-8" />
    </section>
  );
};

export default GrowthStrategy;
