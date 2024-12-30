import React from "react";
import UserStakedBalance from "../UserStakedBalance";
import APRDisplay from "../APRDisplay";
import StakingActions from "./StakingActions";
import { useChain } from "@/context/ChainContext";
import { useWallet } from "@solana/wallet-adapter-react";
import { useStaking } from "@/hooks/useStaking";
import { PoolInfo } from "@/pages/staking";

interface Props {
  pools: PoolInfo[];
  stakedAmount: number;
}

const StakeRewardToken: React.FC<Props> = ({ pools = [], stakedAmount = 0 }) => {
  const { activeChain } = useChain();
  const { connected } = useWallet();
  const { getUserStakeInfo } = useStaking();
  const [selectedAPR, setSelectedAPR] = React.useState<string | null>(null);
  const [userStakeInfo, setUserStakeInfo] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchUserStakeInfo = async () => {
      if (connected && selectedAPR) {
        try {
          const info = await getUserStakeInfo(selectedAPR);
          setUserStakeInfo(info);
        } catch (error) {
          console.error("Error fetching user stake info:", error);
        }
      }
    };

    fetchUserStakeInfo();
  }, [connected, selectedAPR, getUserStakeInfo]);

  const handleSuccess = () => {
    // Refresh user stake info after successful action
    if (selectedAPR) {
      getUserStakeInfo(selectedAPR).then(setUserStakeInfo).catch(console.error);
    }
  };

  return (
    <div className="flex flex-col items-center px-6 pt-6 pb-12 mt-6 bg-neutral-800 rounded-[32px] max-md:px-5">
      <div className="flex gap-5 justify-between w-full max-w-[1120px] max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col flex-1">
          <div className="text-2xl font-medium leading-8">Stake LFY</div>
          <div className="mt-3 text-base leading-6 text-neutral-400">
            Stake your LFY tokens and earn rewards
          </div>
        </div>
        <UserStakedBalance balance={stakedAmount} />
      </div>
      <div className="mt-8 w-full max-w-[1120px] max-md:max-w-full">
        <div className="flex gap-5 justify-between max-md:flex-wrap">
          {Array.isArray(pools) && pools.map((pool, index) => (
            <APRDisplay
              key={index}
              apr={pool.apr}
              duration={pool.duration}
              isSelected={selectedAPR === pool.address}
              onClick={() => setSelectedAPR(pool.address)}
            />
          ))}
        </div>
      </div>
      {selectedAPR && (
        <StakingActions
          poolAddress={selectedAPR}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default StakeRewardToken;
