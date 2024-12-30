import React from "react";
import EnterAppBtn from "../common/EnterAppBtn";
import InfoSquare from "./InfoSquare";

const InfoSquares: React.FC = () => {
  const infoSquaresData = [
    {
      id: "1",
      title: "The Problem:",
      content:
        "Until now theres been no viable way for meme coin holders to earn a yield on their tokens other than LP providing. The issue with LP provision is in the volatility in meme coins inherently. Everyone is waiting for their meme coins to explode in price, which means theres a real risk of impermanent loss when staked in an LP. The LP has to remain balanced, which will potentially require the LP to sell off half of either asset if theres volatility. That means most meme coin holders would rather not risk losing their potential gains.",
      iconSrc: "/icons/info-square-icon.png",
    },
    {
      id: "2",
      title: "The Solution:",
      content:
        "LFG is providing a sustainable yield fi solution through its 2 token ecosystem. Rather than stake an LP for your meme coins, holders will be able to stake in single stake pools, allowing them not to miss potential gains. Its high transit system when stakers can enter and exit at will. The protocol earns through a 5% entry and 5% exit fee. This is very important due to the volatility of meme coins. If a potential meme coin is up 30% for the day, you probably won't mind paying 5% to leave the pool right? Probably not. This is why we expect there to be considerable volume both ways.",
      iconSrc: "/icons/info-square-icon.png",
    },
    {
      id: "3",
      title: "How do we do it?:",
      content:
        'LFG will be a 2 token ecosystem. Both will have their own emissions and purpose. We have developed a proprietary algorithm called "Dynamic Variable Emission Control" DVEC which will adjust based on numerous factors including: Price, TVL, and Volume. This is important to note as we wont just be blindly emitting tokens unsustainably.',
      iconSrc: "/icons/info-square-icon.png",
    },
  ];

  return (
    <section className="flex z-20 overflow-hidden flex-col justify-center items-center px-12 pt-6 pb-24 w-full max-md:px-5 max-md:max-w-full gap-y-8">
      <h2 className="text-3xl md:text-4xl font-semibold leading-none text-center text-neutral-800">
        Let&apos;s F*cking Grow.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 self-stretch mt-6 md:mt-10 xl:mt-12 w-full">
        {infoSquaresData.map((square) => (
          <InfoSquare key={square.id} {...square} />
        ))}
      </div>
      <EnterAppBtn className="h-10 md:h-11 lg:h-12 px-5 lg:px-8" />
    </section>
  );
};

export default InfoSquares;
