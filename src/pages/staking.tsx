import React from 'react';
import { useChain } from '@/context/ChainContext';
import { useWallet } from '@solana/wallet-adapter-react';
import { useStaking } from '@/hooks/useStaking';
import dynamic from 'next/dynamic';

export interface PoolInfo {
  address: string;
  apr: number;
  duration: number;
  totalStaked?: number;
  userStaked?: number;
}

// Dynamically import components with ssr disabled
const StakeLFGWithNoSSR = dynamic(() => import('@/components/staking/StakeLFG'), {
  ssr: false,
});

const StakeRewardTokenWithNoSSR = dynamic(() => import('@/components/staking/StakeRewardToken'), {
  ssr: false,
});

const StakingPage = () => {
  const { activeChain } = useChain();
  const { connected } = useWallet();
  const { getPools, getUserTotalStaked } = useStaking();
  const [lfgPools, setLfgPools] = React.useState<PoolInfo[]>([]);
  const [lfyPools, setLfyPools] = React.useState<PoolInfo[]>([]);
  const [lfgStaked, setLfgStaked] = React.useState(0);
  const [lfyStaked, setLfyStaked] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPools = async () => {
      setIsLoading(true);
      try {
        // Always fetch pools regardless of connection status for initial display
        const lfgPoolsData = await getPools("LFG");
        const lfyPoolsData = await getPools("LFY");
        setLfgPools(lfgPoolsData);
        setLfyPools(lfyPoolsData);

        // Only fetch user data if connected
        if (connected && activeChain === "Solana") {
          const lfgStakedAmount = await getUserTotalStaked("LFG");
          const lfyStakedAmount = await getUserTotalStaked("LFY");
          setLfgStaked(lfgStakedAmount);
          setLfyStaked(lfyStakedAmount);
        }
      } catch (error) {
        console.error("Error fetching staking data:", error);
        // Initialize with empty arrays on error
        setLfgPools([]);
        setLfyPools([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPools();
  }, [connected, activeChain, getPools, getUserTotalStaked]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!connected || activeChain !== "Solana") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Please connect your Solana wallet</h1>
        <p className="text-neutral-400">Connect your wallet to interact with staking options</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-[1120px] mx-auto">
        <h1 className="text-4xl font-bold mb-8">Staking</h1>
        <div className="space-y-8">
          <StakeLFGWithNoSSR pools={lfgPools || []} stakedAmount={lfgStaked} />
          <StakeRewardTokenWithNoSSR pools={lfyPools || []} stakedAmount={lfyStaked} />
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(StakingPage), {
  ssr: false
});
