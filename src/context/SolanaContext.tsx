import { createContext, useContext, useMemo } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider } from '@project-serum/anchor';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { IDL as StakingIDL } from '../idl/staking';
import { IDL as BondingIDL } from '../idl/bonding';
import { IDL as AmmIDL } from '../idl/amm';

// Program IDs from your contracts
const STAKING_PROGRAM_ID = new PublicKey('BhURC7xGuDaucKUkpYhjRWktXyjYAhn6ZLCZj2KmZHAd');
const BONDING_PROGRAM_ID = new PublicKey('H2xY4yJwNUyePDCNNxFvNgPjCmdqRWVsD775qSZxL3tG');
const AMM_PROGRAM_ID = new PublicKey('675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8');

export interface SolanaContextState {
  connection: Connection | null;
  stakingProgram: Program | null;
  bondingProgram: Program | null;
  ammProgram: Program | null;
  wallet: any | null;
}

const SolanaContext = createContext<SolanaContextState>({
  connection: null,
  stakingProgram: null,
  bondingProgram: null,
  ammProgram: null,
  wallet: null,
});

export function SolanaProvider({ children }: { children: React.ReactNode }) {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const programs = useMemo(() => {
    if (!wallet) return { stakingProgram: null, bondingProgram: null, ammProgram: null };

    const provider = new AnchorProvider(connection, wallet, {
      commitment: 'confirmed',
    });

    const stakingProgram = new Program(StakingIDL, STAKING_PROGRAM_ID, provider);
    const bondingProgram = new Program(BondingIDL, BONDING_PROGRAM_ID, provider);
    const ammProgram = new Program(AmmIDL, AMM_PROGRAM_ID, provider);

    return { stakingProgram, bondingProgram, ammProgram };
  }, [connection, wallet]);

  return (
    <SolanaContext.Provider
      value={{
        connection,
        wallet,
        ...programs,
      }}
    >
      {children}
    </SolanaContext.Provider>
  );
}

export const useSolana = () => useContext(SolanaContext);
