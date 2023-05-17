import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Diamonds } from "iconsax-react";
export default function Header() {
  return (
    <header className="flex gap-3 items-center  ">
      <h1 className="text-3xl text-pink-100 font-extrabold animate-pulse flex gap-3">
        {/* <Diamonds className="h-8 w-8" /> */}
        <img src="/brandassets/logo.png" className="h-14 w-14" />
       
      </h1>

      <div className="ml-auto">
        <ConnectButton />
      </div>
    </header>
  );
}
