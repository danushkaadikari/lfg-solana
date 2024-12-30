export const IDL = {
  version: "0.1.0",
  name: "solana_lfg",
  instructions: [
    {
      name: "initialize",
      accounts: [
        { name: "authority", isMut: false, isSigner: true },
        { name: "state", isMut: true, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false }
      ],
      args: [
        { name: "percent", type: "u16" },
        { name: "vestingTime", type: "u32" }
      ]
    },
    {
      name: "bondSol",
      accounts: [
        { name: "state", isMut: true, isSigner: false },
        { name: "user", isMut: true, isSigner: true },
        { name: "userLfgAccount", isMut: true, isSigner: false },
        { name: "vault", isMut: true, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
        { name: "clock", isMut: false, isSigner: false }
      ],
      args: [
        { name: "index", type: "u16" },
        { name: "amount", type: "u64" }
      ]
    },
    {
      name: "bondToken",
      accounts: [
        { name: "state", isMut: true, isSigner: false },
        { name: "user", isMut: false, isSigner: true },
        { name: "userTokenAccount", isMut: true, isSigner: false },
        { name: "userLfgAccount", isMut: true, isSigner: false },
        { name: "vault", isMut: true, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
        { name: "clock", isMut: false, isSigner: false }
      ],
      args: [
        { name: "index", type: "u16" },
        { name: "amount", type: "u64" }
      ]
    },
    {
      name: "redeem",
      accounts: [
        { name: "state", isMut: true, isSigner: false },
        { name: "user", isMut: true, isSigner: true },
        { name: "userLfgAccount", isMut: true, isSigner: false },
        { name: "vault", isMut: true, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false },
        { name: "clock", isMut: false, isSigner: false }
      ],
      args: [{ name: "index", type: "u16" }]
    }
  ]
};
