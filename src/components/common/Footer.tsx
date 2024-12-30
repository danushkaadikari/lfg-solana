import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  isDark?: boolean;
};

const Footer = (props: Props) => {
  return (
    <footer
      className={cn(
        "flex overflow-hidden justify-between items-start py-10 md:py-14 px-5 md:px-8 xl:px-12 w-full min-h-56 md:min-h-80 max-md:px-5 max-md:max-w-full",
        props.isDark ? "bg-black bg-opacity-30" : "bg-neutral-200 bg-opacity-50"
      )}
    >
      <div className="flex flex-wrap flex-1 shrink gap-5 md:gap-8 xl:gap-10 items-start w-full basis-0">
        <div className="flex items-center md:flex-col md:items-start">
          <img
            loading="lazy"
            src={props.isDark ? "/icons/logo-dark.png" : "/icons/logo.png"}
            alt="Company logo"
            className="object-contain h-10 md:h-12 xl:h-14"
          />
          <div className="flex gap-2.5 justify-center items-start self-center px-3 mt-2.5 max-w-full ">
            <Link
              href="#"
              aria-label="Telegram"
              className="flex overflow-hidden flex-col justify-center px-1 py-2 w-[43px]"
            >
              <img
                loading="lazy"
                src="/icons/telgram.svg"
                alt=""
                className="object-contain size-10"
              />
            </Link>
            <Link
              href="#"
              aria-label="Twitter"
              className="flex overflow-hidden flex-col justify-center py-1.5 w-9"
            >
              <img
                loading="lazy"
                src="/icons/twitter.svg"
                alt=""
                className="object-contain size-10"
              />
            </Link>
          </div>
        </div>
        <nav className="flex relative flex-wrap flex-1 shrink gap-6 md:gap-8 xl:gap-10 items-start md:text-lg xl:text-xl font-semibold leading-none basis-0 min-w-[240px] text-stone-500 max-md:max-w-full">
          <div className="flex z-0 flex-col">
            <h3
              className={cn(
                "text-stone-900",
                props.isDark ? "text-neutral-200" : "text-stone-900"
              )}
            >
              Legal
            </h3>
            <Link href="#" className="mt-3">
              Terms of service
            </Link>
            <Link href="#" className="mt-3">
              Policies
            </Link>
          </div>
          <div className="flex z-0 flex-col">
            <h3
              className={cn(
                "text-stone-900",
                props.isDark ? "text-neutral-200" : "text-stone-900"
              )}
            >
              Resources
            </h3>
            <Link href="#" className="mt-3">
              White Paper
            </Link>
            <Link href="#" className="mt-3">
              Help
            </Link>
            <Link href="#" className="mt-3">
              FAQ
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
