import React from "react";
import Link from "next/link";
import EnterAppBtn from "./EnterAppBtn";

const Header = () => {
  return (
    <header className="flex overflow-hidden flex-wrap gap-3 md:gap-6 xl:gap-10 justify-between items-center px-3 md:px-5 xl:px-8 w-full font-semibold py-2 md:py-3 xl:py-4">
      <Link href="/" className="">
        <img
          loading="lazy"
          src="/icons/logo.png"
          alt="Company logo"
          className="object-contain shrink-0 h-12"
        />
      </Link>
      <nav className="flex gap-4 md:gap-6 xl:gap-8 justify-center items-center self-stretch my-auto text-xl whitespace-nowrap text-stone-900">
        <Link
          href="#"
          className="self-stretch my-auto hover:text-green-500 transition-all ease-in-out duration-300"
        >
          Place 1
        </Link>
        <Link
          href="#"
          className="self-stretch my-auto hover:text-green-500 transition-all ease-in-out duration-300"
        >
          Place 2
        </Link>
      </nav>
      <div className="self-end flex items-center justify-end md:justify-center w-full md:w-max">
        <EnterAppBtn className="self-end  w-max h-10 md:h-11 lg:h-12 px-5 lg:px-8" />
      </div>
    </header>
  );
};

export default Header;
