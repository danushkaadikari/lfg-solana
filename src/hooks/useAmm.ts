import { useCallback } from 'react';
import { useSolana } from '@/context/SolanaContext';
import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

export function useAmm() {
  const { ammProgram, wallet } = useSolana();

  const deposit = useCallback(async (
    maxCoinAmount: number,
    maxPcAmount: number,
    baseSide: number,
    poolAddress: string
  ) => {
    if (!ammProgram || !wallet) return;

    try {
      const pool = new PublicKey(poolAddress);
      const tx = await ammProgram.methods
        .deposit(new BN(maxCoinAmount), new BN(maxPcAmount), new BN(baseSide))
        .accounts({
          amm: pool,
          userWallet: wallet.publicKey,
          // Add other required accounts
        })
        .rpc();
      
      return tx;
    } catch (error) {
      console.error('Error depositing to AMM:', error);
      throw error;
    }
  }, [ammProgram, wallet]);

  const withdraw = useCallback(async (amount: number, poolAddress: string) => {
    if (!ammProgram || !wallet) return;

    try {
      const pool = new PublicKey(poolAddress);
      const tx = await ammProgram.methods
        .withdraw(new BN(amount))
        .accounts({
          amm: pool,
          userWallet: wallet.publicKey,
          // Add other required accounts
        })
        .rpc();
      
      return tx;
    } catch (error) {
      console.error('Error withdrawing from AMM:', error);
      throw error;
    }
  }, [ammProgram, wallet]);

  const swapBaseIn = useCallback(async (
    amountIn: number,
    minimumAmountOut: number,
    poolAddress: string
  ) => {
    if (!ammProgram || !wallet) return;

    try {
      const pool = new PublicKey(poolAddress);
      const tx = await ammProgram.methods
        .swapBaseIn(new BN(amountIn), new BN(minimumAmountOut))
        .accounts({
          amm: pool,
          userWallet: wallet.publicKey,
          // Add other required accounts
        })
        .rpc();
      
      return tx;
    } catch (error) {
      console.error('Error swapping:', error);
      throw error;
    }
  }, [ammProgram, wallet]);

  return {
    deposit,
    withdraw,
    swapBaseIn,
  };
}
