import React from "react";
import BondingHistoryItem from "./BondingHistoryItem";

const BondingHistory = () => {
  const bondPricesHistory = [
    {
      id: "1",
      date: "23/11/2024",
      bonded: "LFG",
      on: "SOL",
      amount: "$1238",
    },
    {
      id: "2",
      date: "23/11/2024",
      bonded: "LFG",
      on: "SOL",
      amount: "$1238",
    },
    {
      id: "3",
      date: "23/11/2024",
      bonded: "LFG",
      on: "SOL",
      amount: "$1238",
    },
    {
      id: "4",
      date: "23/11/2024",
      bonded: "LFG",
      on: "SOL",
      amount: "$1238",
    },
  ];

  return (
    <div className="flex flex-col justify-center p-8 font-semibold leading-none text-center bg-black bg-opacity-20 rounded-4xl max-md:px-5">
      <div className="self-start text-2xl md:text-3xl xl:text-4xl text-neutral-200">
        Bonding History
      </div>
      <div className="flex flex-col mt-5 md:mt-8 w-full gap-y-3 md:gap-y-4">
        {bondPricesHistory.map((bondPrice) => (
          <BondingHistoryItem key={bondPrice.id} {...bondPrice} />
        ))}
      </div>
    </div>
  );
};

export default BondingHistory;
