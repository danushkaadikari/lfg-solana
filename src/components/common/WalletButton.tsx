import React from "react";
import { Button } from "../ui/button";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const WalletButton = () => {
  return (
    // <Button className="flex items-center h-12 text-lg md:text-xl xl:text-2xl font-semibold leading-tight text-center bg-green-500 rounded-xl text-neutral-800 hover:text-green-500 font-mazzard border-2 border-transparent hover:border-green-500 transition-all ease-out duration-300">
    //   Connect Wallet
    // </Button>
    <ConnectButton />
  );
};

export default WalletButton;
