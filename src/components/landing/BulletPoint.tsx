import React from "react";

export interface BulletPointProps {
  iconSrc: string;
  text: string;
}

const BulletPoint: React.FC<BulletPointProps> = ({ iconSrc, text }) => {
  return (
    <div className="flex gap-6 items-center self-stretch rounded-3xl md:rounded-4xl">
      <div className="flex flex-col justify-center items-center self-stretch my-auto w-14 h-14 bg-green-500 rounded-2xl min-h-[56px]">
        <img
          loading="lazy"
          src={iconSrc}
          alt=""
          className="object-contain size-5 sm:size-6 md:size-7 lg:size-8 aspect-square"
        />
      </div>
      <div className="self-stretch my-auto text-xl md:text-2xl font-semibold leading-none text-stone-500">
        {text}
      </div>
    </div>
  );
};

export default BulletPoint;
