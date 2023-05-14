import { useState } from "react";
import { useContractRead, usePrepareContractWrite } from "wagmi";
import { writeContract, prepareWriteContract } from "@wagmi/core";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { erc20ABI } from "wagmi";
import { config, humanFriendlyBalance, abbreviateNumber, humanFriendlyBalanceWithFixed } from "../../config/contracts.js";
import type { Address } from "wagmi";
import { Timer } from "iconsax-react";
import { BigNumber, ethers } from "ethers";
import { useBalance } from "wagmi";
import { useContractWrite } from "wagmi";
import { waitForTransaction } from "@wagmi/core";
import { useConnectModal } from "@rainbow-me/rainbowkit";



const Staking = () => {

  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const { data } = useBalance({
    address: address,
  })

  const [activeTab, setActiveTab] = useState("stake");
  const [stakeAmount, setStakeAmount] = useState(0);

  function humanToEther(amount: number, decimals: number) {
    return amount * (10 ** decimals);
  }

  const { data: userBalance } = useContractRead({
    abi: erc20ABI,
    address: config.address as Address,
    functionName: "balanceOf",
    args: [address as Address],
  });

  const { data: rewardsClaimable } = useContractRead({
    abi: config.stakingAbi,
    address: config.staking as Address,
    functionName: "rewardsClaimable",
  });


  const { data: currentStakingId } = useContractRead({
    abi: config.stakingAbi,
    address: config.staking as Address,
    functionName: "currentStakingId",
  });

  const { data: minStakingAmount } = useContractRead({
    abi: config.stakingAbi,
    address: config.staking as Address,
    functionName: "minStakingAmount",
  });

  const { data: maxStakingAmount } = useContractRead({
    abi: config.stakingAbi,
    address: config.staking as Address,
    functionName: "maxStakingAmount",
  });

  const { data: totalStaked } = useContractRead({
    abi: config.stakingAbi,
    address: config.staking as Address,
    functionName: "totalStaked",
    args: [currentStakingId],
  });

  const { data: burnFee } = useContractRead({
    abi: config.stakingAbi,
    address: config.staking as Address,
    functionName: "tokenFee",
  });

  const { data: bnbFee } = useContractRead({
    abi: config.stakingAbi,
    address: config.staking as Address,
    functionName: "stakingFee",
  });

  const { data: isStakingEnabled } = useContractRead({
    abi: config.stakingAbi,
    address: config.staking as Address,
    functionName: "isStakingEnabled",
  });

  const { data: stakingData } = useContractRead({
    abi: config.stakingAbi,
    address: config.staking as Address,
    functionName: "stakers",
    args: [currentStakingId, address as Address],
  });




  async function approveSpends() {

    const { hash } = await writeContract({
      abi: erc20ABI,
      address: config.address as Address,
      functionName: "approve",
      args: [config.staking as Address, BigInt("115792089237316195423570985008687907853269984665640564039457584007913129639935")],
    });
    await toast.promise(
      waitForTransaction({ hash: hash }),
      {
        loading: "Approving...",
        success: "Approved",
        error: "Approval failed",
      },
    );




  }


  const { config: stakePrepareConfig, error: stakePrepareError } = usePrepareContractWrite({
    abi: config.stakingAbi,
    address: config.staking as Address,
    functionName: "stake",
    args: [humanToEther(stakeAmount, 8)],
    "value": bnbFee,
  })
  const { isSuccess, writeAsync } = useContractWrite(stakePrepareConfig);

  async function stake() {

    if (stakePrepareError) {
      if (stakePrepareError.message.includes("User denied transaction signature.")) {
        toast.error("Transaction rejected");
        return;
      }
      if (stakePrepareError.message.includes("Staking is not enabled")) {
        toast.error("Staking Not Live Yet!");
        return;
      }
      if (stakePrepareError.message.includes("Insufficient staking fee")) {
        toast.error("You donot have enough bnb;");
        return;
      }
      if (stakePrepareError.message.includes("Insufficient token allowance")) {
        await approveSpends();

      }
      if (stakePrepareError.message.includes("Already staked")) {
        toast.error("Already staked");
        return;
      }
      if (stakePrepareError.message.includes("Amount is less than minimum staking amount")) {
        toast.error("Amount is less than minimum staking amount");
        return;
      }
      if (stakePrepareError.message.includes("Amount is more than maximum staking amount")) {
        toast.error("Amount is more than maximum staking amount");
        return;
      }


      toast.error(stakePrepareError.message);
      return;
    }



    if (typeof writeAsync !== "function") return;
    const promise = writeAsync();
    if (promise) {
      promise
        .then(async (txHash) => {
          if (txHash) {
            console.log("txHash", txHash);
            const toastId = toast.loading("Staking in progress", {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            });
            await waitForTransaction({
              hash: txHash.hash,
            });
            toast.dismiss(toastId);
            toast.success("Burnt", {
              icon: "👏",
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            });
          }
        })
        .catch((error) => {
          if (error.message.includes("User denied transaction signature.")) {
            toast.error("User denied transaction signature.");
          }
          else {
            toast.error(error.message, {
              icon: "🕊",
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            });
          }

        });
    }
  }

  const stakingData_ = stakingData as Array<BigNumber | BigNumber | Boolean>;





  return (
    <section
      className={`rounded-xl flex flex-col gap-6 pb-8 md:pb-0 md:gap-8 mb-8 md:flex-row ${!isConnected ? "bg-black pointer-events-none" : ""
        }`}
    >
      <div
        className={`${!isConnected ? "brightness-50" : ""
          } bg-[#111111] rounded-xl p-4 pb-8 text-white flex flex-col gap-4 md:p-6 md:pb-10 md:w-[50%] lg:w-[40%]`}
      >
        <h1 className="font-[100] text-lg">STAKE $PTC / Earn $XRP</h1>

        <div className="flex flex-col gap-2 text-[#494949] font-medium">
          <div className="flex ">
            <div className="staking-info ">
              <p>Min Stake : {abbreviateNumber(humanFriendlyBalance(Number(minStakingAmount), 8))} PTC </p>
              <p>Max Stake : {abbreviateNumber(humanFriendlyBalance(Number(maxStakingAmount), 8))} PTC</p>
              <p>Total Staked : {abbreviateNumber(humanFriendlyBalance(Number(totalStaked), 8))} PTC</p>
            </div>
            <div className="cost-info ml-auto text-right">
              <p>BURN FEE : {abbreviateNumber(humanFriendlyBalance(Number(burnFee), 8))} PTC </p>
              <p>BNB FEE : {abbreviateNumber(humanFriendlyBalanceWithFixed(bnbFee, 18, 4))} BNB</p>
              <p className="animate-pulse font-bold">STATUS : {isStakingEnabled ? "LIVE" : "PAUSED"}</p>
            </div>

          </div>

          <div className="flex gap-2 justify-end text-[#FFFFFFF5] mt-4 ">
            <button onClick={() => setActiveTab("stake")} className={`${activeTab == "stake" ? "bg-[#2C2C2C]" : "bg-[#101010]"} py-[12px] px-[20px] rounded-[12px] transition-all duration-200 ease-linear hover:bg-[#2c2c2cd5]`}>
              Stake
            </button>
            <div className="relative">
              <button
                onClick={() => setActiveTab("claim")}
                disabled
                className={` py-[12px] px-[20px] rounded-[12px] transition-all duration-200 ease-linear hover:bg-[#2c2c2cd5]`}>


                Claim
              </button>
              {!rewardsClaimable &&
                <span className="absolute rounded-lg top-[-10px] right-0 bg-pink-100 text-black px-1.5 py-0.5  font-light text-xs">
                  Not Active
                </span>}

            </div>

          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="stakeAmount" className="font-medium">
            Stake Amount
          </label>



          <div className="relative">
            <input
              type="text"
              id="stakeAmount"
              value={stakeAmount}
              onChange={(e) => {
                if (e.target.value == "") {
                  setStakeAmount(0)
                }
                else {
                  setStakeAmount(parseFloat(e.target.value))
                }

              }}
              className={`${isConnected ? "hover:border-[#FFFFFF] focus:border-[#FFFFFF]" : ""
                } bg-[#1A1A1A] rounded-lg px-3 py-3 outline-none border border-[#FFFFFF59] transition-all duration-200 ease-linear w-full `}
              placeholder="0"
            />
            <button

              onClick={() => {
                setStakeAmount(parseFloat(humanFriendlyBalance(BigNumber.from(userBalance).sub(BigNumber.from(burnFee)), 8)));
              }}

              className="absolute top-0 right-0 h-8 p-2 m-1 bg-[#2C2C2C] w-20  text-xs font-light mt-2  rounded-[12px] transition-all duration-200 ease-linear hover:bg-[#2c2c2cd5]">
              Max
            </button>
          </div>
          <div className="flex justify-between items-center">

            <p className="text-sm"> Balance: {abbreviateNumber(humanFriendlyBalance(userBalance, 8))} PTC</p>
            <p className="text-sm"> {data ? parseFloat(data.formatted).toFixed(2) : 0} BNB</p>
          </div>

          <button
            onClick={stake}
            className="w-full flex justify-center gap-2 mt-2 bg-black rounded-lg py-2 font-[200] transition-all duration-200 ease-linear hover:bg-[#000000b3]"
            disabled={!isConnected || !isStakingEnabled || stakingData_[2] == true}

          >
            {stakingData_ && stakingData_[2] == true ? <span className="animate-pulse flex gap-2">
              <Timer className="h-5 animate-spin" /> Staked : {humanFriendlyBalance(stakingData_[0], 8)} PTC
            </span> : isStakingEnabled == true ? "Stake" : "!! Staking Paused !!"}
          </button>
        </div>
      </div>

      <div className="text-white flex flex-col items-start gap-10 px-4 md:px-2 md:w-[50%] lg:w-[60%]">
        <div
          className={`${!isConnected ? "brightness-50" : ""
            } w-full flex flex-col gap-4 md:gap-5`}
        >
          <div className="flex justify-between items-center md:pt-4">
            <h1 className="font-[100] text-xl">Staking</h1>

            <button>
              {/* <HiX className="text-white text-xl" /> */}
            </button>
          </div>

          <div>
            <p>
              Our unique Staking Portal is truly a first in space and revolutionary for DeFi. Using our custom built Proof of Holding Consensus model, we allow users to Stake $PTC without their tokens leaving their wallets and claim Bep20 XRP every 30 days so long as their Holdings meet or exceed snapshot taken when setting up staking each month! See our White Paper for more details!
            </p>
          </div>
        </div>

        {!isConnected && (
          <button onClick={openConnectModal} className="pointer-events-auto w-auto bg-[#1A1B1F] rounded-lg px-6 py-2 font-medium transition-all duration-200 ease-linear hover:bg-[#1a1b1fd8]">
            Connect Wallet
          </button>
        )}
      </div>
    </section>
  );
};

export default Staking;