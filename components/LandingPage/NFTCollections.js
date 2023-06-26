import React from "react";
import Link from "next/link";
import GoldBgBtn from "./common/GoldBgBtn";
import TransparentBgBtn from "./common/TransparentBgBtn";
import { constants } from "../../config/constants";

const NFTCollections = () => {
  return (
    <div className="text-white py-10 flex flex-col gap-8 xl:px-28">
      <h1 className="text-xl font-[600] sm:text-2xl lg:text-4xl">
        Gen1 & Gen2 NFT collections
      </h1>

      <div className="grid gap-y-8 lg:grid-cols-2 lg:gap-y-6 lg:gap-x-4">
        <div className="text-sm font-[300] leading-relaxed flex flex-col gap-4 lg:text-base lg:row-span-1">
          <p>
            Our NFT collections are designed to benefit the holders by providing
            them with more utility and value. By holding our NFTs, you will have
            access to exclusive content and rewards.
          </p>

          <p>
            We are planning to create a small DAO within our Discord server that
            will only be accessible to OGs (Gen1 holders) This will provide more
            utilities to our community, such as Alpha Hunting, and serve as a
            hub where we can freely share our opinions.
          </p>

          <p>
            Gen2 NFTs would be giving you access to the same rewards and
            utilities but to enter the DAO you need to be an OG!
          </p>
        </div>

        <div className="flex justify-center lg:row-span-2">
          <img
            src={"/assets/images/6._Flip_Coin_animation_-_Espresso_Brown.png"}
            alt=""
            className="w-full max-w-[450px] object-cover"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 xs:flex-row lg:justify-start lg:row-span-1">
          <Link href={constants.whitepaper} passHref>
            <a>
              <GoldBgBtn btnLabel="WHITEPAPER" />
            </a>
          </Link>
          <Link href='/dapp' passHref>
            <a>
              <TransparentBgBtn btnLabel="ENTER DAPP" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NFTCollections;
