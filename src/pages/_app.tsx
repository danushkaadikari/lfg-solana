import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { useRouter } from "next/router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, type Locale } from "@rainbow-me/rainbowkit";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
require('@solana/wallet-adapter-react-ui/styles.css');

import { config } from "../wagmi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { NextUIProvider } from "@nextui-org/react";
import { ChainProvider } from "@/context/ChainContext";
import { SolanaProvider } from "@/context/SolanaContext";

const queryClient = new QueryClient();
const endpoint = clusterApiUrl('devnet');
const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
];

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter() as { locale: Locale };
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <SolanaProvider>
                <RainbowKitProvider locale={locale}>
                  <NextUIProvider>
                    <ChainProvider>
                      <Component {...pageProps} />
                    </ChainProvider>
                    <ToastContainer autoClose={3000} />
                  </NextUIProvider>
                </RainbowKitProvider>
              </SolanaProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
