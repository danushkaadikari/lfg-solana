import { useCallback } from 'react';
import { useSolana } from '@/context/SolanaContext';
import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

// Mock data for development - replace with actual pool data later
const MOCK_POOLS = {
  LFG: [
    { address: "pool1", apr: 5.5, duration: 30 },
    { address: "pool2", apr: 7.2, duration: 60 },
    { address: "pool3", apr: 9.8, duration: 90 },
  ],
  LFY: [
    { address: "pool4", apr: 4.2, duration: 30 },
    { address: "pool5", apr: 6.1, duration: 60 },
    { address: "pool6", apr: 8.5, duration: 90 },
  ],
};

export function useStaking() {
  const { stakingProgram, wallet } = useSolana();

  const getPools = useCallback(async (tokenType: "LFG" | "LFY") => {
    // TODO: Replace with actual on-chain data fetching
    return MOCK_POOLS[tokenType];
  }, []);

  const getUserStakeInfo = useCallback(async (poolAddress: string) => {
    if (!stakingProgram || !wallet) return null;

    try {
      const pool = new PublicKey(poolAddress);
      const userStakeAccount = await stakingProgram.account.userStake.fetch(pool);
      return userStakeAccount;
    } catch (error) {
      console.error('Error fetching user stake info:', error);
      return null;
    }
  }, [stakingProgram, wallet]);

  const getUserTotalStaked = useCallback(async (tokenType: "LFG" | "LFY") => {
    if (!stakingProgram || !wallet) return 0;

    try {
      // TODO: Replace with actual on-chain data fetching
      // For now, return mock data
      return tokenType === "LFG" ? 1000 : 500;
    } catch (error) {
      console.error('Error fetching total staked:', error);
      return 0;
    }
  }, [stakingProgram, wallet]);

  const deposit = useCallback(async (amount: number, poolAddress: string) => {
    if (!stakingProgram || !wallet) return;

    try {
      const pool = new PublicKey(poolAddress);
      const tx = await stakingProgram.methods
        .deposit(new BN(amount))
        .accounts({
          pool,
          user: wallet.publicKey,
          // Add other required accounts
        })
        .rpc();
      
      return tx;
    } catch (error) {
      console.error('Error depositing:', error);
      throw error;
    }
  }, [stakingProgram, wallet]);

  const withdraw = useCallback(async (amount: number, poolAddress: string) => {
    if (!stakingProgram || !wallet) return;

    try {
      const pool = new PublicKey(poolAddress);
      const tx = await stakingProgram.methods
        .withdraw(new BN(amount))
        .accounts({
          pool,
          user: wallet.publicKey,
          // Add other required accounts
        })
        .rpc();
      
      return tx;
    } catch (error) {
      console.error('Error withdrawing:', error);
      throw error;
    }
  }, [stakingProgram, wallet]);

  const harvest = useCallback(async (poolAddress: string) => {
    if (!stakingProgram || !wallet) return;

    try {
      const pool = new PublicKey(poolAddress);
      const tx = await stakingProgram.methods
        .harvest()
        .accounts({
          pool,
          user: wallet.publicKey,
          // Add other required accounts
        })
        .rpc();
      
      return tx;
    } catch (error) {
      console.error('Error harvesting:', error);
      throw error;
    }
  }, [stakingProgram, wallet]);

  return {
    deposit,
    withdraw,
    harvest,
    getPools,
    getUserStakeInfo,
    getUserTotalStaked,
  };
}
