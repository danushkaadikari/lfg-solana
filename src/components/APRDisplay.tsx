import { APRLength } from "@/lib/types";
import React from "react";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

interface APRDisplayProps {
  aprLengths: APRLength[];
  setSelectedAPR: React.Dispatch<React.SetStateAction<APRLength | null>>;
  selectedAPR: APRLength | null;
}

const APRDisplay: React.FC<APRDisplayProps> = ({
  aprLengths,
  setSelectedAPR,
  selectedAPR,
}) => {
  return (
    <div className="flex overflow-hidden flex-col items-center self-start p-2 md:p-4 rounded-xl md:rounded-2xl bg-neutral-900 min-w-[240px]">
      <h3 className="text-xl md:text-2xl text-neutral-200">APR</h3>
      <div className="flex items-center gap-1.5 md:gap-2.5 mt-4">
        {aprLengths.map((apr, index) => (
          <button
            onClick={() => {
              setSelectedAPR(apr);
            }}
            className="flex items-center gap-x-2"
            key={apr.value}
          >
            {index > 0 && (
              <Separator
                className="min-h-14 md:min-h-16"
                orientation="vertical"
              />
            )}
            <div
              className={cn(
                "flex flex-col items-center h-full cursor-pointer transition-all duration-200 ease-in p-1.5 md:p-2",
                selectedAPR?.value === apr.value
                  ? " bg-neutral-700 rounded-2xl"
                  : "hover:bg-neutral-800 rounded-2xl"
              )}
            >
              {apr.length && (
                <div className="md:text-lg text-neutral-500">{apr.length}</div>
              )}
              <div className="mt-1 text-xl md:text-2xl text-neutral-200">
                {apr.value}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default APRDisplay;
