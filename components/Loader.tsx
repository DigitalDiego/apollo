import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function Loader() {
  return (
    <div className="w-full h-full grid place-items-center">
      <AiOutlineLoading className="text-base animate-spin" />
    </div>
  );
}
