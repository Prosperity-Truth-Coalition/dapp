import React from "react";

import { useRecoilValue } from "recoil";
import { selectedTabState } from "../../atoms/selectedTab";
import { Chainlink, Wallet1, Trade } from "iconsax-react";

interface TabProps {
  title: string;
  comingSoon: boolean;
  onClick?: () => void;
}

export default function Tab(props: TabProps) {
  const selectedTab = useRecoilValue(selectedTabState);

  const isSelected = selectedTab === props.title.toLowerCase();


  return (
    <button
      className={`bg-[#111111] gap-3 text-white flex px-2 w-[136px] py-1.5 rounded-sm relative pb-2 ${
        isSelected
          ? "border-4 border-t-0 border-l-0 border-r-0 border-[#c5a364]"
          : ""
      }`}
      disabled={props.comingSoon}
      onClick={props.onClick}
    >
      {props.title === "Stake" && <Chainlink className="w-6 h-6 " />}
      {props.title === "Burn" && <Wallet1 className="w-6 h-6 " />}
      {props.title === "Trade" && <Trade className="w-6 h-6 " />}

      <div className="">
        {props.title}

        {props.comingSoon && (
          <span className="absolute rounded-lg top-[-10px] right-0 bg-[#c5a364] text-black px-1.5 py-0.5  font-light text-xs">
            * Soon
          </span>
        )}
      </div>
    </button>
  );
}
