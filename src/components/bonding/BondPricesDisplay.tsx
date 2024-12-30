import { BondPrice } from "@/lib/types";
import React from "react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

interface BondPricesProps {
  bondPrices: BondPrice[];
}

const BondPricesDisplay: React.FC<BondPricesProps> = ({ bondPrices }) => {
  return (
    <div className="flex overflow-hidden flex-col items-center self-start p-4 rounded-2xl bg-neutral-900 min-w-[240px]">
      <h3 className="text-2xl text-neutral-200">Bond Prices</h3>
      <div className="flex items-center gap-2.5 mt-4">
        {bondPrices.map((bondprice, index) => (
          <div key={bondprice.value} className="flex items-center gap-x-2">
            {index > 0 && (
              <Separator className=" min-h-16" orientation="vertical" />
            )}
            <div
              className={cn("flex flex-col items-center h-full p-1.5 md:p-2")}
            >
              <div className="text-lg text-neutral-500">{bondprice.title}</div>
              <div className="mt-1 text-2xl text-neutral-200">
                {bondprice.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BondPricesDisplay;
