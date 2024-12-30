import DashboardLayout from "@/components/dashboard-layout";
import React, { useEffect, useState } from "react";

import StakeLFG from "@/components/staking/StakeLFG";
import StakeRewardToken from "@/components/staking/StakeRewardToken";
import { getAccount, readContract } from "@wagmi/core";

import LFGStakingABI from "../../abi/LFGStakingABI.json";
import { config, LFGStakingAddress } from "../../config";
import { useAccount, useConnect, useConnections } from "wagmi";

export interface PoolInfo {
  APR: number;
  lockTime: number;
}

const StakingPage = () => {
  const { address, isConnected } = useAccount();
  const [timer, setTimer] = useState<null | NodeJS.Timeout>(null);
  const [pools, setPools] = useState<PoolInfo[]>([]);
  const [stakedAmount, setStakedAmount] = useState<number>(0);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    const fetchData = async () => {
      const pool_result = await readContract(config, {
        address: LFGStakingAddress,
        abi: LFGStakingABI,
        functionName: "getPools",
      });
      //@ts-ignore
      setPools(pool_result);

      const staked_result = await readContract(config, {
        address: LFGStakingAddress,
        abi: LFGStakingABI,
        functionName: "getStaked",
        args: [address],
      });
      //@ts-ignore
      setStakedAmount(Number(staked_result) / 1e18);
    };

    if (address != undefined && isConnected) {
      setTimer(
        setInterval(() => {
          fetchData();
        }, 5000)
      );
    }
  }, [address, isConnected]);
  console.log(
    "--------------------------render-------------------------------"
  );
  return (
    <DashboardLayout>
      <div className="w-full flex overflow-hidden flex-col p-3 md:p-5 xl:p-8 font-semibold leading-none ">
        <h1 className="self-start text-3xl md:text-4xl xl:text-5xl text-center text-neutral-200">
          Staking
        </h1>
        <section className="flex flex-col mt-5 md:mt-8 xl:mt-12 w-full">
          <StakeLFG pools={pools} stakedAmount={stakedAmount} />
          <StakeRewardToken />
        </section>
      </div>
    </DashboardLayout>
  );
};

export default StakingPage;
