import React from "react";
import GoldBgBtn from "./common/GoldBgBtn";
import TransparentBgBtn from "./common/TransparentBgBtn";

import Link from "next/link";
import { useRouter } from "next/router";

const POHIntro = () => {

  const router = useRouter();
  return (
    <div className="text-white grid items-center gap-y-8 pt-10 pb-5 xl:px-28">
      <h1 className="text-xl font-[600] sm:text-2xl lg:text-4xl">
        What is POH?
      </h1>

      <p className="text-gold text-xs font-[300] text-center sm:text-base lg:text-end">
        PTC TOKEN CONTRACT ADDRESS (BSCSCAN)
      </p>

      <div className="col-span-2 text-sm font-[300] leading-relaxed flex flex-col gap-8 lg:text-base lg:gap-4">
        <p>
          We have brought the Proof of Holding (PoH) system to DeFi and Web3
          officially, replacing the traditional lock staking model like Proof of
          Stake (PoS). In this consensus model, stakers are required to perform
          their staking transaction within a 24-hour staking window once a
          month.
        </p>

        <p>
          PoH is a much more flexible consensus algorithm because it allows
          users to retain ownership of assets, do sells or transfers above their
          snapshot number, and allows the team to continue adding more utility
          to the asset without running into issues that arise from a more
          traditional Proof of Stake system.
        </p>
      </div>

      <div className="col-span-2 flex flex-col items-center justify-center gap-4 xs:flex-row md:justify-start">
        <GoldBgBtn btnLabel="WHITEPAPER" />

        <Link href='/dapp' passHref>
          <a>
            <TransparentBgBtn btnLabel="ENTER DAPP" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default POHIntro;
