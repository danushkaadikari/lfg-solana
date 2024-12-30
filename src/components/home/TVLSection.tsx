import React from "react";

const TVLSection = () => {
  return (
    <section className="flex flex-col mt-12 w-full max-md:mt-10 max-md:max-w-full">
      <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold self-start">
        TVL
      </h2>
      <div className="flex flex-col p-8 mt-4 w-full bg-black bg-opacity-30 rounded-[30px] max-md:px-5 max-md:max-w-full">
        <img
          loading="lazy"
          src="/images/chart.png"
          alt="Total Value Locked chart"
          className="object-contain w-full h-72 md:h-80 xl:h-96"
        />
        <p className="self-start mt-5 md:mt-8 max-md:max-w-full text-lg md:text-xl xl:text-2xl font-semibold">
          Total Value Locked : $1.3M
        </p>
      </div>
    </section>
  );
};

export default TVLSection;
