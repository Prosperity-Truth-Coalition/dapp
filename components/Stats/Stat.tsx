import React from "react";

interface StatProps {
  title: string;
  value: string;
  isgreen?: boolean;
  isOrange?: boolean;
  isDynamic?: boolean;
}

export default function Stat(props: StatProps) {
  return (
    <div
      className={`bg-[#111111] p-4  flex flex-col gap-2 drop-shadow-xl text-white font-extrabold border-2 border-t-0  border-b-1  border-r-1 border-l-0 border-[#c5a364]`}
    >
      <h1 className="font-regular">{props.title}</h1>
      <p
        className={`font-light ${
          props.isgreen
            ? "text-green-400"
            : props.isOrange
            ? "text-orange-300"
            : ""
        } ${props.isDynamic ? "animate-pulse" : ""}`}
      >
        {props.value}
      </p>
    </div>
  );
}
