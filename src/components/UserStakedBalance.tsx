import React from "react";

interface UserStakedBalanceProps {
  balance: string;
}

const UserStakedBalance: React.FC<UserStakedBalanceProps> = ({ balance }) => {
  return (
    <div className="flex overflow-hidden flex-col items-center p-4 rounded-2xl bg-neutral-900 min-w-[240px]">
      <h3 className="text-xl md:text-2xl text-neutral-200">
        User Staked Balance
      </h3>
      <div className="flex flex-col items-center mt-2 sm:m-3 md:mt-4">
        <div className="text-xl sm:text-2xl md:text-3xl text-neutral-200">
          {balance}
        </div>
        <p className="md:text-lg text-neutral-500">Currently Staked</p>
      </div>
    </div>
  );
};

export default UserStakedBalance;
