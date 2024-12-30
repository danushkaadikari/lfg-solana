import React from "react";

type Props = {
  title: string;
  content: string;
  iconSrc: string;
};

const InfoSquare = (props: Props) => {
  return (
    <div className="flex flex-col px-6 pt-6 pb-14 bg-neutral-200 bg-opacity-50 rounded-3xl max-md:px-5">
      <div className="flex flex-col justify-center items-center w-14 h-14 bg-green-500 rounded-2xl min-h-[56px]">
        <img
          loading="lazy"
          src={props.iconSrc}
          alt=""
          className="object-contain w-8 aspect-square"
        />
      </div>
      <div className="flex flex-col mt-6 w-full font-semibold">
        <h3 className="self-start text-2xl md:text-3xl leading-none text-center text-neutral-800">
          {props.title}
        </h3>
        <p className="mt-3 text-sm sm:text-base md:text-lg leading-7 text-stone-500 text-pretty">{props.content}</p>
      </div>
    </div>
  );
};

export default InfoSquare;
