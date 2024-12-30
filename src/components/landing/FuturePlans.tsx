import React from "react";
import BulletPoint from "./BulletPoint";
import EnterAppBtn from "../common/EnterAppBtn";

const FuturePlans = () => {
  const bulletPoints = [
    {
      id: "1",
      iconSrc: "/icons/plus-btn.svg",
      text: "Borrowing & Lending",
    },
    {
      id: "2",

      iconSrc: "/icons/plus-btn.svg",
      text: "Leverage Trading",
    },
    {
      id: "3",

      iconSrc: "/icons/plus-btn.svg",
      text: "Swaps",
    },
    {
      id: "4",
      iconSrc: "/icons/plus-btn.svg",
      text: "Gambling",
    },
  ];

  return (
    <section className="flex z-20  overflow-hidden flex-wrap gap-10 justify-between items-center px-12 pt-6 pb-12 max-md:px-5">
      <div className="flex flex-col self-stretch my-auto min-w-[240px] max-md:max-w-full">
        <header className="flex flex-col font-semibold max-md:max-w-full">
          <h2 className="self-start text-3xl md:text-4xl leading-none text-center text-stone-900">
            Future Plans:
          </h2>
          <p className="mt-4 text-lg md:text-xl xl:text-2xl leading-8 text-stone-500 max-md:max-w-full">
            Our goal is to continue to broaden this <br />
            ecosystem into various other meme coin{" "}
            <br className="hidden md:flex" />
            utilities such as:{" "}
          </p>
        </header>
        <div className="flex flex-col self-start mt-5 md:mt-8 gap-y-5 md:gap-8 xl:gap-y-10">
          <div className="flex flex-col items-start gap-y-5 md:gap-y-6">
            {bulletPoints.map((point) => (
              <BulletPoint key={point.id} {...point} />
            ))}
          </div>
          <EnterAppBtn className="w-max h-10 md:h-11 lg:h-12 px-5 lg:px-8" />
        </div>
      </div>
      <img
        loading="lazy"
        src="/images/future-plans-illustration.svg"
        alt="Future plans illustration"
        className="object-contain self-stretch my-auto aspect-square max-md:max-w-full"
      />
    </section>
  );
};

export default FuturePlans;
