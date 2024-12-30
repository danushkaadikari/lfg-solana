export const IDL = {
  version: "0.1.0",
  name: "amm",
  instructions: [
    {
      name: "initialize",
      accounts: [
        { name: "amm", isMut: true, isSigner: false },
        { name: "ammAuthority", isMut: false, isSigner: false },
        { name: "ammOpenOrders", isMut: true, isSigner: false },
        { name: "ammLpMint", isMut: true, isSigner: false },
        { name: "ammCoinMint", isMut: false, isSigner: false },
        { name: "ammPcMint", isMut: false, isSigner: false },
        { name: "ammCoinVault", isMut: true, isSigner: false },
        { name: "ammPcVault", isMut: true, isSigner: false },
        { name: "ammTargetOrders", isMut: true, isSigner: false },
        { name: "ammConfig", isMut: false, isSigner: false },
        { name: "createFeeDestination", isMut: true, isSigner: false },
        { name: "marketProgram", isMut: false, isSigner: false },
        { name: "market", isMut: false, isSigner: false },
        { name: "userWallet", isMut: true, isSigner: true },
        { name: "userTokenCoin", isMut: true, isSigner: false },
        { name: "userTokenPc", isMut: true, isSigner: false },
        { name: "userTokenLp", isMut: true, isSigner: false }
      ],
      args: [
        { name: "nonce", type: "u8" },
        { name: "openTime", type: "u64" },
        { name: "initPcAmount", type: "u64" },
        { name: "initCoinAmount", type: "u64" }
      ]
    },
    {
      name: "deposit",
      accounts: [
        { name: "amm", isMut: true, isSigner: false },
        { name: "ammAuthority", isMut: false, isSigner: false },
        { name: "ammOpenOrders", isMut: true, isSigner: false },
        { name: "ammTargetOrders", isMut: true, isSigner: false },
        { name: "ammLpMint", isMut: true, isSigner: false },
        { name: "ammCoinVault", isMut: true, isSigner: false },
        { name: "ammPcVault", isMut: true, isSigner: false },
        { name: "userWallet", isMut: false, isSigner: true },
        { name: "userTokenCoin", isMut: true, isSigner: false },
        { name: "userTokenPc", isMut: true, isSigner: false },
        { name: "userTokenLp", isMut: true, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false }
      ],
      args: [
        { name: "maxCoinAmount", type: "u64" },
        { name: "maxPcAmount", type: "u64" },
        { name: "baseSide", type: "u64" }
      ]
    },
    {
      name: "withdraw",
      accounts: [
        { name: "amm", isMut: true, isSigner: false },
        { name: "ammAuthority", isMut: false, isSigner: false },
        { name: "ammOpenOrders", isMut: true, isSigner: false },
        { name: "ammTargetOrders", isMut: true, isSigner: false },
        { name: "ammLpMint", isMut: true, isSigner: false },
        { name: "ammCoinVault", isMut: true, isSigner: false },
        { name: "ammPcVault", isMut: true, isSigner: false },
        { name: "userWallet", isMut: false, isSigner: true },
        { name: "userTokenCoin", isMut: true, isSigner: false },
        { name: "userTokenPc", isMut: true, isSigner: false },
        { name: "userTokenLp", isMut: true, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false }
      ],
      args: [{ name: "amount", type: "u64" }]
    },
    {
      name: "swapBaseIn",
      accounts: [
        { name: "amm", isMut: true, isSigner: false },
        { name: "ammAuthority", isMut: false, isSigner: false },
        { name: "ammOpenOrders", isMut: true, isSigner: false },
        { name: "ammTargetOrders", isMut: true, isSigner: false },
        { name: "ammCoinVault", isMut: true, isSigner: false },
        { name: "ammPcVault", isMut: true, isSigner: false },
        { name: "userWallet", isMut: false, isSigner: true },
        { name: "userTokenCoin", isMut: true, isSigner: false },
        { name: "userTokenPc", isMut: true, isSigner: false },
        { name: "tokenProgram", isMut: false, isSigner: false }
      ],
      args: [
        { name: "amountIn", type: "u64" },
        { name: "minimumAmountOut", type: "u64" }
      ]
    }
  ]
};
