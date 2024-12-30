import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Loading from "../Loading";
import { useStaking } from "@/hooks/useStaking";
import { toast } from "react-toastify";
import { useChain } from "@/context/ChainContext";

type Props = {
  poolAddress: string;
  onSuccess?: () => void;
};

const StakingActions = ({ poolAddress, onSuccess }: Props) => {
  const [stakeAmount, setStakeAmount] = useState<number | null>(null);
  const { deposit, withdraw, harvest } = useStaking();
  const [loading, setLoading] = useState(false);
  const { activeChain } = useChain();

  const handleStake = async () => {
    if (!stakeAmount) return;
    
    setLoading(true);
    try {
      const tx = await deposit(stakeAmount, poolAddress);
      if (tx) {
        toast.success("Stake successful!");
        onSuccess?.();
      }
    } catch (error) {
      console.error("Stake error:", error);
      toast.error("Failed to stake: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnstake = async () => {
    if (!stakeAmount) return;
    
    setLoading(true);
    try {
      const tx = await withdraw(stakeAmount, poolAddress);
      if (tx) {
        toast.success("Unstake successful!");
        onSuccess?.();
      }
    } catch (error) {
      console.error("Unstake error:", error);
      toast.error("Failed to unstake: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async () => {
    setLoading(true);
    try {
      const tx = await harvest(poolAddress);
      if (tx) {
        toast.success("Rewards claimed successfully!");
        onSuccess?.();
      }
    } catch (error) {
      console.error("Claim error:", error);
      toast.error("Failed to claim: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (!activeChain || activeChain !== "Solana") {
    return null; // Only show for Solana chain
  }

  return (
    <>
      {loading && <Loading />}
      <div className="flex flex-wrap gap-4 items-start mt-8 leading-tight text-center max-md:max-w-full">
        <form className="flex gap-2.5 justify-center items-center pl-4 rounded-2xl bg-neutral-900" onSubmit={(e) => {
          e.preventDefault();
          handleStake();
        }}>
          <label htmlFor="stakeAmount" className="sr-only">
            Stake Amount
          </label>
          <Input
            id="stakeAmount"
            onChange={(e) => setStakeAmount(Number(e.target.value))}
            type="number"
            placeholder="$ Amount"
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            disabled={loading}
          />
          <Button
            type="submit"
            disabled={!stakeAmount || loading}
            className="bg-green-500 hover:bg-green-600"
          >
            {loading ? "Staking..." : "Stake"}
          </Button>
        </form>

        <Button
          onClick={handleUnstake}
          disabled={!stakeAmount || loading}
          className="bg-red-500 hover:bg-red-600"
        >
          {loading ? "Unstaking..." : "Unstake"}
        </Button>

        <Button
          onClick={handleClaim}
          disabled={loading}
          className="bg-yellow-500 hover:bg-yellow-600"
        >
          {loading ? "Claiming..." : "Claim"}
        </Button>
      </div>
    </>
  );
};

export default StakingActions;
