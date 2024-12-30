import { cn } from "@/lib/utils";
import GetSvg from "./get-svg";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
  },
  {
    title: "Staking",
    url: "/staking",
  },
  {
    title: "Bonding",
    url: "/bonding",
  },
  {
    title: "Farms",
    url: "/farms",
  },
  {
    title: "Memes",
    url: "/memes",
  },
];

const SIDEBAR_WIDTH = "16rem";
// const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "4rem";

import React, { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
// import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

const AppSidebar = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  // Toggle function to expand or minimize the sidebar
  // const toggleSidebar = () => {
  //   setIsExpanded(!isExpanded);
  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("isExpanded", JSON.stringify(!isExpanded));
  //   }
  // };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isExpanded = localStorage.getItem("isExpanded");
    if (isExpanded) {
      setIsExpanded(JSON.parse(isExpanded));
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    if (mediaQuery.matches) {
      setIsExpanded(false);
    }

    mediaQuery.addEventListener("change", (e) => {
      if (e.matches) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    });

    return () => {
      mediaQuery.removeEventListener("change", () => {});
    };
  }, []);

  return (
    <motion.aside
      initial={{ width: isExpanded ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_ICON }}
      animate={{ width: isExpanded ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_ICON }}
      transition={{ duration: 0.5 }}
      className="bg-background  flex flex-col h-full sm:p-2 sm:p-4 shrink-0  min-h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] overflow-hidden relative"
    >
      <nav className="flex flex-col font-medium gap-2 mt-8 text-sm">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            className={cn(
              "flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 rounded-md",
              pathname === item.url
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            <GetSvg
              name={item.title.toLowerCase()}
              className={cn(
                "size-9 ",
                pathname === item.url ? "" : "text-[#758178]"
              )}
            />
            <motion.span
              initial={{ display: "none", opacity: 0 }}
              animate={{ display: isExpanded ? "block" : "none", opacity: 1 }}
              transition={{ duration: 0.1 }}
              className={cn(
                "self-stretch my-auto text-xl font-semibold leading-none text-center ",
                pathname === item.url
                  ? "text-primary-foreground"
                  : "text-[#758178]"
              )}
            >
              {item.title}
            </motion.span>
          </Link>
        ))}
      </nav>
      <div className="flex flex-col md:flex-row gap-1 md:gap-2.5 justify-center items-start self-center mt-2.5 max-w-full ">
        <Link
          href="#"
          aria-label="Telegram"
          className="flex overflow-hidden flex-col justify-center px-1 py-2"
        >
          <img
            loading="lazy"
            src="/icons/telgram.svg"
            alt=""
            className="object-contain size-7 md:size-8 lx:size-10"
          />
        </Link>
        <Link
          href="#"
          aria-label="Twitter"
          className="flex overflow-hidden flex-col justify-center py-1.5"
        >
          <img
            loading="lazy"
            src="/icons/twitter.svg"
            alt=""
            className="object-contain size-7 md:size-8 lx:size-10"
          />
        </Link>
      </div>
      {/* <button
        onClick={toggleSidebar}
        className="absolute bottom-4 right-4 size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
      >
        {isExpanded ? (
          <ArrowLeftIcon className="size-6" />
        ) : (
          <ArrowRightIcon className="size-6" />
        )}
      </button> */}
    </motion.aside>
  );
};

export default AppSidebar;
