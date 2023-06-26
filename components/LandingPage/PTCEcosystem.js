import React from "react";
import GoldBgBtn from "./common/GoldBgBtn";

const PTCEcosystem = () => {
  return (
    <div className="text-white flex flex-col gap-10 py-5 xl:px-28">
      <div className="mb-5 flex flex-col items-center text-center gap-4">
        <h1 className="text-xl font-[600] mb-5 sm:text-2xl lg:text-4xl">
          PTC ECOSYSTEM
        </h1>

        <div className="text-sm font-[300] mb-5 leading-relaxed flex flex-col gap-4 lg:text-base">
          <p>Our platform is built on a three-pillar system of portals</p>
          <p>
            These portals are designed to provide our investors with a seamless
            and user-friendly
          </p>
          <p>
            experience that will enable them to achieve their financial goals.
          </p>
        </div>

        <GoldBgBtn btnLabel="UTILITIES" />
      </div>

      <div className="text-white grid gap-5 lg:grid-cols-3">
        <div className="bg-[#121015] border border-[#919092] p-5 rounded-md flex flex-col gap-5">
          <h3 className="font-[900] lg:text-lg">The Burn Portal</h3>

          <p className="text-sm font-[300] lg:text-base">
            Our Community Burn Portal is a key pillar in slowly reducing the
            Circulating Supply of PTC. Burn Reflections earned from TVL of
            others' Trades and Transfers without hurting your natural position!
          </p>

          <p className="text-sm font-[300] lg:text-base">
            Crypto projects may burn tokens to reduce supply, which could lead
            to increased prices in the future as tokens become more scarce.
          </p>
        </div>

        <div className="bg-[#121015] border border-[#919092] p-5 rounded-md flex flex-col gap-5">
          <h3 className="font-[900] lg:text-lg">The Stake Portal</h3>

          <p className="text-sm font-[300] lg:text-base">
            Our unique Staking Portal is truly a first in space and
            revolutionary for DeFi. Using our custom built Proof of Holding
            Consensus model, we allow users to Stake $PTC without their tokens
            leaving their wallets and claim Bep20 XRP every 30 days so long as
            their Holdings meet or exceed snapshot taken when setting up staking
            each month! See our White Paper for more details!
          </p>
        </div>

        <div className="bg-[#121015] border border-[#919092] p-5 rounded-md flex flex-col gap-5">
          <h3 className="font-[900] lg:text-lg">The Trade Portal</h3>

          <p className="text-sm font-[300] lg:text-base">
            Trading Portal is a revolutionary utility allowing the ability to
            trade PTC and Bep20 XRP staking rewards to any other Crypto currency
            across BSC or 15 other popular blockchains with low fees and Onramp
            / Offramp for fiat without KYC!
          </p>

          <p className="text-sm font-[300] lg:text-base">
            The purpose of an in dApp trading portal for PTC is to provide users
            with a secure and efficient way to trade their tokens within our own
            dApp ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PTCEcosystem;
