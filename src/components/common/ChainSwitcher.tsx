import React from "react";
import { cn } from "@/lib/utils";
import GetSvg from "../get-svg";
import { useChain } from "@/context/ChainContext";

interface ChainOption {
  name: string;
  imgSrc: string;
}

const chainOptions: ChainOption[] = [
  {
    name: "Ethereum",
    imgSrc: "/icons/ethereum.svg",
  },
  {
    name: "Solana",
    imgSrc: "/icons/solana.svg",
  },
];

const ChainSwitcher: React.FC = () => {
  const { activeChain, setActiveChain } = useChain();

  return (
    <div className="flex gap-2.5 items-start self-stretch my-auto">
      <div className="h-12 px-1 flex items-center rounded-lg bg-black bg-opacity-30">
        {chainOptions.map((option) => (
          <button
            key={option.name}
            onClick={() => setActiveChain(option.name)}
            className=""
          >
            <GetSvg
              name={option.name.toLowerCase()}
              className={cn(
                "self-stretch my-auto aspect-square size-10 shrink-0 p-1 rounded-lg ",
                activeChain == option.name
                  ? "bg-green-500 "
                  : "text-[#758178]/50"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChainSwitcher;
