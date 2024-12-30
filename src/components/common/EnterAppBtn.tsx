import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  className?: string;
};

const EnterAppBtn = (props: Props) => {
  return (
    <Button
      asChild
      className={cn(
        "my-auto py-5 h-12 px-8 text-xl font-semibold leading-tight text-center bg-green-500 rounded-xl text-neutral-800 hover:text-neutral-100 border-2 border-transparent hover:border-green-500 transition-all ease-out duration-300",
        props.className
      )}
    >
      <Link href="/home">Enter App</Link>
    </Button>
  );
};

export default EnterAppBtn;
