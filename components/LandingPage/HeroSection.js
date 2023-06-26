import React from "react";
import Header from "./Header";

const HeroSection = () => {
  return (
    <div className="">
      <Header />

      <div className="grid grid-cols-1 pt-8 sm:grid-cols-2 sm:items-center sm:gap-y-8 lg:gap-y-4 xl:pt-16">
        <div className="flex flex-col items-center gap-6 text-white font-[500] text-[20px] text-center sm:col-span-2 lg:gap-10 xl:gap-14">
          <h1 className="xs:text-2xl md:text-3xl lg:text-4xl xl:text-[60px]">
            EARN BINANCE PEGGED XRP
          </h1>
          <h1 className="xs:text-[22px] md:text-2xl lg:text-3xl xl:text-[50px]">
            BY STAKING $PTC TOKENS!
          </h1>
        </div>

        <div className="flex flex-col items-center gap-4 text-gold pt-8 text-sm font-[300] xs:text-lg sm:items-start md:text-xl lg:text-2xl lg:gap-6 xl:text-3xl xl:pl-28">
          <p>
            TOGETHER{" "}
            <span className="sm:block sm:pt-4 lg:pt-6">WE WILL MAKE</span>
          </p>
          <p className="sm:block">OUR OWN DESTINY!</p>
        </div>

        <div className="relative flex justify-center xl:pr-20">
          <img src={"/assets/images/PTC_OG_COINs.png"} alt="" className="w-[85%] sm:w-auto" />
        </div>

        <div className="h-[1px] bg-gold sm:col-span-2 xl:mx-28"></div>
      </div>
    </div>
  );
};

export default HeroSection;
