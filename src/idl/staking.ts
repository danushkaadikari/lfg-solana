export const IDL = {
  version: "0.1.0",
  name: "lfg_staking",
  instructions: [
    {
      name: "createStateFirst",
      accounts: [
        { name: "state", isMut: true, isSigner: false },
        { name: "authority", isMut: false, isSigner: true },
        { name: "lfgRewardVault", isMut: false, isSigner: false },
        { name: "clock", isMut: false, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false }
      ],
      args: [{ name: "tokenPerSecond", type: "u64" }]
    },
    {
      name: "deposit",
      accounts: [
        { name: "pool", isMut: true, isSigner: false },
        { name: "user", isMut: true, isSigner: false },
        { name: "state", isMut: true, isSigner: false },
        { name: "authority", isMut: false, isSigner: true },
        { name: "userTokenAccount", isMut: true, isSigner: false },
        { name: "poolTokenAccount", isMut: true, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
        { name: "clock", isMut: false, isSigner: false }
      ],
      args: [{ name: "amount", type: "u64" }]
    },
    {
      name: "withdraw",
      accounts: [
        { name: "pool", isMut: true, isSigner: false },
        { name: "user", isMut: true, isSigner: false },
        { name: "state", isMut: true, isSigner: false },
        { name: "authority", isMut: false, isSigner: true },
        { name: "userTokenAccount", isMut: true, isSigner: false },
        { name: "poolTokenAccount", isMut: true, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
        { name: "clock", isMut: false, isSigner: false }
      ],
      args: [{ name: "amount", type: "u64" }]
    },
    {
      name: "harvest",
      accounts: [
        { name: "pool", isMut: true, isSigner: false },
        { name: "user", isMut: true, isSigner: false },
        { name: "state", isMut: true, isSigner: false },
        { name: "authority", isMut: false, isSigner: true },
        { name: "userLfgAccount", isMut: true, isSigner: false },
        { name: "lfgRewardVault", isMut: true, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
        { name: "clock", isMut: false, isSigner: false }
      ],
      args: []
    }
  ]
};
