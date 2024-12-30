import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import TokensSelector from "./TokensSelector";
import MemecoinsSelector from "../memecoins/MemecoinsSelector";
import { Separator } from "../ui/separator";
import { useChain } from "@/context/ChainContext";
import { useBonding } from "@/hooks/useBonding";
import { toast } from "react-toastify";

type Props = {
  onBond: (amount: number) => void;
};

const BondingActions = (prop: Props) => {
  const [bondAmount, setbondAmount] = useState<number | null>(null);
  const { activeChain, setActiveChain } = useChain();
  const { bondSol, bondToken } = useBonding();
  const [selectedToken, setSelectedToken] = useState<string | null>(
    activeChain === "Solana" ? "SOL" : "WETH"
  );
  const [loading, setLoading] = useState(false);

  const [selectedMemecoin, setSelectedMemecoin] = useState<string | null>(null);

  useEffect(() => {
    if (activeChain === "Solana") {
      setSelectedToken("SOL");
    } else {
      setSelectedToken("WETH");
    }
  }, [activeChain]);

  const handleBond = async () => {
    if (!bondAmount || !selectedToken) return;

    setLoading(true);
    try {
      let tx;
      if (activeChain === "Solana") {
        if (selectedToken === "SOL") {
          tx = await bondSol(bondAmount, 0); // index 0 for now
        } else {
          // For other tokens on Solana
          tx = await bondToken(bondAmount, 0, "TOKEN_ACCOUNT_ADDRESS"); // You'll need to get the token account address
        }
      }
      
      if (tx) {
        toast.success("Bond successful!");
        prop.onBond(bondAmount);
      }
    } catch (error) {
      console.error("Bond error:", error);
      toast.error("Failed to bond: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-start mt-8 leading-tight text-center max-md:max-w-full">
      <form className="flex gap-2.5 justify-center items-center pl-4" onSubmit={(e) => {
        e.preventDefault();
        handleBond();
      }}>
        <TokensSelector
          onTokenSelect={setSelectedToken}
          selectedToken={selectedToken}
          defaultToken={activeChain === "Solana" ? "SOL" : "WETH"}
        />
        <Separator className="min-h-10" orientation="vertical" />
        <MemecoinsSelector
          onMemecoinSelect={setSelectedMemecoin}
          selectedMemecoin={selectedMemecoin}
        />
        <div className="flex items-center gap-x-2 bg-neutral-900 rounded-2xl">
          <label htmlFor="bondAmount" className="sr-only">
            Bond Amount
          </label>
          <Input
            id="bondAmount"
            onChange={(e) => setbondAmount(Number(e.target.value))}
            type="number"
            placeholder="$ Amount"
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            type="submit"
            disabled={!bondAmount || loading}
            className="bg-green-500 hover:bg-green-600"
          >
            {loading ? "Bonding..." : "Bond"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BondingActions;
