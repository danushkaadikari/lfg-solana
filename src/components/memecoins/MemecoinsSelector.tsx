import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  onMemecoinSelect: React.Dispatch<React.SetStateAction<string | null>>;
  selectedMemecoin: string | null;
};

interface MemecoinProps {
  icon: string;
  name: string;
  symbol: string;
}

const memecoins: MemecoinProps[] = [
  {
    icon: "/icons/memecoins/rectangle-1.png",
    name: "Dogwifhat",
    symbol: "WIF",
  },
  {
    icon: "/icons/memecoins/rectangle-1-2.png",
    name: "Bonk",
    symbol: "BONK",
  },
  {
    icon: "/icons/memecoins/rectangle-1-3.png",
    name: "Popcat",
    symbol: "POPCAT",
  },
  {
    icon: "/icons/memecoins/rectangle-1-4.png",
    name: "CIADW",
    symbol: "MEW",
  },
  {
    icon: "/icons/memecoins/rectangle-1-5.png",
    name: "Goatseus Maximus",
    symbol: "GOAT",
  },
  {
    icon: "/icons/memecoins/rectangle-1-6.png",
    name: "Book Of Meme",
    symbol: "BOME",
  },
  {
    icon: "/icons/memecoins/rectangle-1-7.png",
    name: "Gigachad",
    symbol: "GIGA",
  },
  {
    icon: "/icons/memecoins/rectangle-1-8.png",
    name: "Fwog",
    symbol: "FWOG",
  },
  {
    icon: "/icons/memecoins/rectangle-1-9.jpeg",
    name: "Act 1",
    symbol: "ACT",
  },
  {
    icon: "/icons/memecoins/rectangle-1-10.png",
    name: "Peanut The Squirrel",
    symbol: "PNUT",
  },
  {
    icon: "/icons/memecoins/rectangle-1-11.jpeg",
    name: "Moo Deng",
    symbol: "MOODENG",
  },
  {
    icon: "/icons/memecoins/rectangle-1-12.png",
    name: "Ponke",
    symbol: "PONKE",
  },
  {
    icon: "/icons/memecoins/rectangle-1-13.png",
    name: "Michi",
    symbol: "MICHI",
  },
  {
    icon: "/icons/memecoins/rectangle-1-14.png",
    name: "Retardio",
    symbol: "RETARDIO",
  },
  {
    icon: "/icons/memecoins/rectangle-1-15.png",
    name: "Mumu The Bull",
    symbol: "MUMU",
  },
];

const MemecoinsSelector = (props: Props) => {
  return (
    <div>
      <Select onValueChange={props.onMemecoinSelect}>
        <SelectTrigger className="h-12 border-none px-8 py-4 rounded-xl bg-neutral-900 text-neutral-100 min-w-[240px] max-md:px-5">
          <SelectValue placeholder="Select Memecoin" />
        </SelectTrigger>
        <SelectContent className="p-4 rounded-xl bg-neutral-900 border-none text-neutral-100">
          {memecoins.map((memecoin, index) => (
            <SelectItem
              key={index}
              value={memecoin.symbol}
              className="w-full flex flex-row gap-2.5 items-center whitespace-nowrap text-neutral-200 hover:text-neutral-800"
            >
              <div className="flex items-center gap-x-2">
                <img
                  loading="lazy"
                  src={memecoin.icon}
                  alt={memecoin.name}
                  className="object-contain shrink-0 self-stretch my-auto w-6 rounded aspect-square"
                />
                <div className="self-stretch my-auto ">{memecoin.name}</div>
                <div className="self-stretch my-auto text-neutral-500">
                  {memecoin.symbol}
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MemecoinsSelector;
