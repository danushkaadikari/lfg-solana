import React from "react";
import { Spinner } from "@nextui-org/react";

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Spinner size="lg" color="white" />
    </div>
  );
};

export default Loading;