import { useCallback } from 'react';
import { useSolana } from '@/context/SolanaContext';
import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

export function useBonding() {
  const { bondingProgram, wallet } = useSolana();

  const bondSol = useCallback(async (amount: number, index: number) => {
    if (!bondingProgram || !wallet) return;

    try {
      const tx = await bondingProgram.methods
        .bondSol(new BN(index), new BN(amount))
        .accounts({
          user: wallet.publicKey,
          // Add other required accounts
        })
        .rpc();
      
      return tx;
    } catch (error) {
      console.error('Error bonding SOL:', error);
      throw error;
    }
  }, [bondingProgram, wallet]);

  const bondToken = useCallback(async (amount: number, index: number, tokenAccount: string) => {
    if (!bondingProgram || !wallet) return;

    try {
      const tx = await bondingProgram.methods
        .bondToken(new BN(index), new BN(amount))
        .accounts({
          user: wallet.publicKey,
          userTokenAccount: new PublicKey(tokenAccount),
          // Add other required accounts
        })
        .rpc();
      
      return tx;
    } catch (error) {
      console.error('Error bonding token:', error);
      throw error;
    }
  }, [bondingProgram, wallet]);

  const redeem = useCallback(async (index: number) => {
    if (!bondingProgram || !wallet) return;

    try {
      const tx = await bondingProgram.methods
        .redeem(new BN(index))
        .accounts({
          user: wallet.publicKey,
          // Add other required accounts
        })
        .rpc();
      
      return tx;
    } catch (error) {
      console.error('Error redeeming:', error);
      throw error;
    }
  }, [bondingProgram, wallet]);

  return {
    bondSol,
    bondToken,
    redeem,
  };
}
