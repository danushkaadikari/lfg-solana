import React from "react";
import ChainSwitcher from "./common/ChainSwitcher";
import WalletButton from "./common/WalletButton";
import Link from "next/link";

const DashboardHeader = () => {
  return (
    <header className="w-full flex flex-col md:flex-row md:h-20 items-start md:items-center gap-3 md:gap-10 justify-between px-3 sm:px-5 md:px-8 py-5">
      <Link href="/" className="self-center">
        <img
          loading="lazy"
          src="/icons/logo-dark.png"
          alt="Company logo"
          className="object-contain shrink-0 self-stretch my-auto h-10"
        />
      </Link>
      <div className="flex gap-4 justify-between items-center self-stretch my-auto ">
        <ChainSwitcher />
        <WalletButton />
      </div>
    </header>
  );
};

export default DashboardHeader;
