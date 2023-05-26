import React from "react";
import Tab from "./Tab";
import { useRecoilState } from "recoil";
import { selectedTabState } from "../../atoms/selectedTab";

export default function Tabs() {
  const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState);
  return (
    <div className="flex flex-wrap justify-center gap-4 md:justify-start">
      <Tab
        title="Burn"
        comingSoon={false}
        onClick={() => {
          setSelectedTab("burn");
        }}
      />
      <Tab
        title="Stake"
        comingSoon={false}
        onClick={() => {
          setSelectedTab("stake");
        }}
      />
      <Tab
        title="Trade"
        comingSoon={false}
        onClick={() => {
          setSelectedTab("trade");
        }}
      />
      
    </div>
  );
}
