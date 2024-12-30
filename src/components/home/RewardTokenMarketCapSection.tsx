import React from "react";

const RewardTokenMarketCapSection = () => {
  return (
    <section className="flex flex-col mt-5 md:mt-8 xl:mt-12 w-full  max-md:max-w-full">
      <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold self-start">
        LFY Market Cap
      </h2>
      <div className="flex flex-col p-5 md:p-8 mt-4 w-full bg-black bg-opacity-30 rounded-3xl md:rounded-4xl">
        <img
          loading="lazy"
          src="/images/chart.png"
          alt="LFY Market Cap chart"
          className="object-contain w-full h-72 md:h-80 xl:h-96"
        />
        <p className="self-start mt-8 max-md:max-w-full text-2xl font-semibold">
          LFY Market Cap : $0.74
        </p>
      </div>
    </section>
  );
};

export default RewardTokenMarketCapSection;
