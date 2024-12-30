import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useChain } from "@/context/ChainContext";

type Props = {
  onTokenSelect: React.Dispatch<React.SetStateAction<string | null>>;
  selectedToken: string | null;
  defaultToken?: string;
};

interface TokenProps {
  icon: string;
  name: string;
  symbol: string;
}

const tokens: TokenProps[] = [
  {
    icon: "/icons/tokens/solana.svg",
    name: "Solana",
    symbol: "SOL",
  },
  {
    icon: "/icons/tokens/wETH.png",
    name: "Wrapped Ether",
    symbol: "WETH",
  },
  {
    icon: "/icons/tokens/usdc.svg",
    name: "USD Coin",
    symbol: "USDC",
  },
  {
    icon: "/icons/tokens/usdt.svg",
    name: "Tether",
    symbol: "USDT",
  },
];

const ethereum_tokens: TokenProps[] = [
  {
    icon: "/icons/tokens/wETH.png",
    name: "Wrapped Ether",
    symbol: "WETH",
  },
];

const solana_tokens: TokenProps[] = [
  {
    icon: "/icons/tokens/solana.svg",
    name: "Solana",
    symbol: "SOL",
  },
];

const common_tokens: TokenProps[] = [
  {
    icon: "/icons/tokens/usdc.svg",
    name: "USD Coin",
    symbol: "USDC",
  },
  {
    icon: "/icons/tokens/usdt.svg",
    name: "Tether",
    symbol: "USDT",
  },
];

const TokensSelector = (props: Props) => {
  const { activeChain, setActiveChain } = useChain();

  return (
    <div>
      <Select
        defaultValue={props.defaultToken}
        onValueChange={props.onTokenSelect}
        value={props.selectedToken ?? props.defaultToken}
      >
        <SelectTrigger className="h-12 border-none px-8 py-4 rounded-xl bg-neutral-900 text-neutral-100 min-w-[240px] max-md:px-5">
          <SelectValue placeholder="Select Token" />
        </SelectTrigger>
        <SelectContent className="p-4 rounded-xl bg-neutral-900 border-none text-neutral-100">
          {(activeChain === "Ethereum"
            ? ethereum_tokens.concat(common_tokens)
            : solana_tokens.concat(common_tokens)
          ).map((token, index) => (
            <SelectItem
              key={index}
              value={token.symbol}
              className="w-full flex flex-row gap-2.5 items-center whitespace-nowrap text-neutral-200 hover:text-neutral-800"
            >
              <div className="flex items-center gap-x-2">
                <img
                  loading="lazy"
                  src={token.icon}
                  alt={token.name}
                  className="object-contain shrink-0 self-stretch my-auto w-6 rounded aspect-square"
                />
                <div className="self-stretch my-auto ">{token.name}</div>
                <div className="self-stretch my-auto text-neutral-500">
                  {token.symbol}
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TokensSelector;
