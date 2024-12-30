import React from "react";
import EnterAppBtn from "../common/EnterAppBtn";

const TitleSection = () => {
  return (
    <section className="flex overflow-hidden flex-col justify-center items-center gap-y-10 px-12 pt-16 md:pt-24 pb-8 md:pb-12 w-full font-semibold text-center max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col justify-center items-center max-md:max-w-full">
        <h1 className="text-6xl md:text-7xl xl:text-8xl leading-[100px] text-stone-900 max-md:max-w-full max-md:text-4xl max-md:leading-10 text-pretty">
          LFG Defi Protocol <br /> on{" "}
          <span className="text-green-500 font-extrabold">Solana</span>
        </h1>
        <p className="mt-6 lg:text-lg xl:text-xl leading-7 text-stone-500 max-md:max-w-full">
          LFG is an entire gamified defi ecosystem which will allow Solana
          memecoin holders <br /> to earn a yield on their memecoins while
          holding for the next upwards cycle.
        </p>
      </div>
      <EnterAppBtn className="h-10 md:h-11 lg:h-12 px-5 lg:px-8" />
    </section>
  );
};

export default TitleSection;
