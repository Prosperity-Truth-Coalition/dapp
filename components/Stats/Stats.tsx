import React from "react";
import { useContractRead } from "wagmi";
import { Address } from "wagmi";
import { useEffect, useState } from "react";
import { getPairsMatchingBaseTokenAddress } from "dexscreener-api";
import TokensResponse from "dexscreener-api/dist/types/TokensResponse.js";
import Stat from "./Stat";
import { config, humanFriendlyBalance } from "../../config/contracts.js";
import { BigNumber } from "ethers";


export default function Stats() {
  const [pairInfo, setPairInfo] = useState({} as TokensResponse);
  const [actualBurnt, setActualBurnt] = useState<BigNumber>(BigNumber.from(0));

  useEffect(() => {
    const fetchInterval = setInterval(() => {
      getPairsMatchingBaseTokenAddress(config.address).then((data) => {
        setPairInfo(data);
      });
    }, 3000);

    return () => clearInterval(fetchInterval);

  }, []);

  const { data: totalSupply } = useContractRead({
    abi: config.abi,
    address: config.address as Address,
    functionName: "totalSupply",
  });

  const { data: totalBurnt } = useContractRead({
    abi: config.abi,
    address: config.address as Address,
    functionName: "balanceOf",
    args: [config.blackhole as Address],
  });

  const { data: buyBacks } = useContractRead({
    abi: config.abi,
    address: config.address as Address,
    functionName: "balanceOf",
    args: [config.address as Address],
  });

  //Staking

  const {data:currentStakingId} = useContractRead({
    abi: config.stakingAbi,
    address: config.staking as Address,
    functionName: "currentStakingId",
  });

  const { data: totalStaked } = useContractRead({
    abi: config.stakingAbi,
    address: config.staking as Address,
    functionName: "totalStaked",
    args: [currentStakingId],
  });


  useEffect(() => {
    if (buyBacks && totalBurnt) {
      const BigtotalBurnt = BigNumber.from(totalBurnt);
      const BigbuyBacks = BigNumber.from(buyBacks);
      setActualBurnt(BigtotalBurnt.add(BigbuyBacks));
    }
  }, [buyBacks, totalBurnt]);


  const getNormalizedInteger = (value: number) => {
    //take integer and return it as a string with M for millions and K for thousands and B for billions
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(2) + " B";
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(2) + " M";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(2) + " K";
    } else {
      return value.toFixed(2);
    }
  };

    


  const getBurntPercentage = () => {
    if (totalSupply && actualBurnt) {
      const BigtotalBurnt = BigNumber.from(actualBurnt);
      const BigtotalSupply = BigNumber.from(totalSupply);
      return BigtotalBurnt.mul(100).div(BigtotalSupply).toString();
    }
    return "0";
  };

  return (
    <div className="grid flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8 sm:grid-cols-2 md:grid-cols-3">
      <Stat
        title="Total Supply"
        value={
          totalSupply
            ? humanFriendlyBalance(totalSupply.toString(), config.decimals)
            : "0"
        }
      />

      <Stat
        title="FDV"
        isgreen={true}
        isDynamic={true}
        value={
          pairInfo.pairs
            ? pairInfo.pairs[0].fdv
              ? pairInfo.pairs[0].fdv.toString() + " USD"
              : ""
            : "0"
        }
      />
      <Stat
        title="Market Price"
        isDynamic={true}
        isgreen={true}
        value={
          pairInfo.pairs
            ? pairInfo.pairs[0].priceUsd
              ? pairInfo.pairs[0].priceUsd.toString() + " USD"
              : ""
            : "0"
        }
      />
      <Stat
        title="Total Burnt"
        isOrange={true}
        value={(totalBurnt ? getNormalizedInteger(parseInt(humanFriendlyBalance(actualBurnt.toString(),config.decimals))) : "0") + " PTC" + " \n(" + getBurntPercentage() + "% of Supply)" } 
      />
      <Stat
        title="Total Staked"
        isOrange={true}
        value={(totalStaked ? getNormalizedInteger(parseInt(humanFriendlyBalance(totalStaked,config.decimals))) : "0") + " PTC"  } 
      />
    </div>
  );
}
