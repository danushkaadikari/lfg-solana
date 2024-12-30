import { http, createConfig } from "@wagmi/core";
import { sepolia } from "@wagmi/core/chains";

export const LFGAddress = "0x848821C9e2A918dedE4f4C136fEaF6f20bA41ba0";
export const LFGStakingAddress = "0xaF141711F93edEaD40bf98658Ce081399b101d3E";

export const LFG_DECIMAL = 18;
export const rLFG_DECIMAL = 18;

export const config = createConfig({
  // chains: [mainnet, sepolia],
  chains: [sepolia],
  transports: {
    //   [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
