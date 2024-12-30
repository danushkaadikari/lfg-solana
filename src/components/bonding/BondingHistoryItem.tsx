import React from "react";
import { Separator } from "../ui/separator";

type Props = {
  className?: string;
  date: string;
  bonded: string;
  on: string;
  amount: string;
};

const BondingHistoryItem = (props: Props) => {
  return (
    <div className="flex gap-8 items-start w-full max-md:max-w-full">
      <div className="flex overflow-hidden flex-col flex-1 shrink items-start p-4 w-full rounded-2xl basis-0 bg-neutral-900 min-w-[240px] max-md:max-w-full">
        <div className="text-lg md:text-xl xl:text-2xl text-neutral-200">{props.date}</div>
        <div className="flex gap-5 items-start mt-4">
          <div className="flex flex-col items-center">
            <div className="text-lg text-neutral-500">Bonded</div>
            <div className="mt-1 text-2xl text-neutral-200">{props.bonded}</div>
          </div>
          <Separator className=" min-h-16" orientation="vertical" />
          <div className="flex flex-col items-center">
            <div className="text-lg text-neutral-500">On</div>
            <div className="mt-1 text-2xl text-neutral-200">{props.on}</div>
          </div>
          <Separator className=" min-h-16" orientation="vertical" />

          <div className="flex flex-col items-center">
            <div className="text-lg text-neutral-500">Amount</div>
            <div className="mt-1 text-2xl text-neutral-200">{props.amount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BondingHistoryItem;
