import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = {
  onStake: (amount: number) => void;
  onClaim: () => void;
  onUnstake: () => void;
};

const StakingActions = (prop: Props) => {
  const [stakeAmount, setStakeAmount] = useState<number | null>(null);

  return (
    <div className="flex flex-wrap gap-4 items-start mt-8 leading-tight text-center max-md:max-w-full">
      <form className="flex gap-2.5 justify-center items-center pl-4 rounded-2xl bg-neutral-900">
        <label htmlFor="stakeAmount" className="sr-only">
          Stake Amount
        </label>
        <Input
          id="stakeAmount"
          onChange={(e) => setStakeAmount(Number(e.target.value))}
          type="number"
          placeholder="$ Amount"
          className="h-12 self-stretch text-lg text-neutral-500 bg-transparent ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
          aria-label="Enter stake amount"
        />
        <Button
          type="submit"
          className="h-12 px-5 text-2xl whitespace-nowrap bg-green-500 rounded-xl text-neutral-800 hover:text-neutral-100 border-2 border-transparent hover:border-green-500 transition-all ease-out duration-300 "
          onClick={() => {
            if (stakeAmount) {
              prop.onStake(Number(stakeAmount));
            }
          }}
        >
          Stake
        </Button>
      </form>
      <Button className="h-12 px-5 text-2xl whitespace-nowrap bg-green-500 rounded-xl text-neutral-800 hover:text-neutral-100 border-2 border-transparent hover:border-green-500 transition-all ease-out duration-300 ">
        Claim
      </Button>
      <Button className="h-12 px-5 text-2xl whitespace-nowrap bg-green-500 rounded-xl text-neutral-800 hover:text-neutral-100 border-2 border-transparent hover:border-green-500 transition-all ease-out duration-300 ">
        Unstake
      </Button>
    </div>
  );
};

export default StakingActions;
