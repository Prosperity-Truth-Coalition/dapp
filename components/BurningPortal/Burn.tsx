import React from "react";
import { erc20ABI } from "wagmi";
import { useContractRead } from "wagmi";
import { Address } from "wagmi";
import { useAccount } from "wagmi";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { waitForTransaction } from "@wagmi/core";
import { config, humanFriendlyBalance } from "../../config/contracts.js";
import { useState } from "react";
import toast from "react-hot-toast";
import { BigNumber, ethers } from "ethers";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export default function Burn() {
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const [burnAmount, setBurnAmount] = useState(0);

  const { data: userBalance } = useContractRead({
    abi: erc20ABI,
    address: config.address as Address,
    functionName: "balanceOf",
    args: [address as Address],
  });

  function parseBalance(number: string, decimals: number) {
    //take integer or float and convert to wei but 8 decimal places
    const balance = ethers.utils.parseUnits(number, decimals);
    return balance;
  }

  const { config: burnConfig, error: burnPrepareError } =
    usePrepareContractWrite({
      abi: config.abi,
      address: config.address as Address,
      functionName: "transfer",
      args: [
        config.blackhole as Address,
        parseBalance(burnAmount.toString(), config.decimals),
      ],
    });

  const { data, isLoading, isSuccess, writeAsync } =
    useContractWrite(burnConfig);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if ((BigNumber.from(userBalance).lt(parseBalance(burnAmount.toString(), config.decimals)))) {
      toast.error("Insufficient Balance", {
        icon: "🙅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;

    }
    console.log("burnAmount", burnAmount, burnPrepareError);
    if (burnPrepareError) {
      console.log("burnPrepareError", burnPrepareError.message);
      if (
        burnPrepareError.message.includes(
          "ansfer amount exceeds the maxTxAmount"
        )
      ) {
        toast.error(
          "Whale Transaction, Please reduce your transaction amount",
          {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }
        );
      } else if (
        burnPrepareError.message.includes("You have already minted the max")
      ) {
        toast.error("Wallet Max Mint Exceeds");
      } else if (burnPrepareError.message.includes("Contract Minting Paused")) {
        toast.error(" Minting Paused");
      }
      else if (burnPrepareError.message.includes("User denied transaction signature.")) {
        toast.error("User denied transaction signature.");
      }
      else {
        toast.error(burnPrepareError.message, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }

      return;
    }

    if (typeof writeAsync !== "function") return;
    const promise = writeAsync();
    if (promise) {
      promise
        .then(async (txHash) => {
          if (txHash) {
            console.log("txHash", txHash);
            const toastId = toast.loading("Burning in progress", {
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

  return (
    <section
      className={`rounded-xl flex flex-col gap-6 pb-8 md:pb-0 md:gap-8 mb-8 md:flex-row ${!isConnected ? "bg-black pointer-events-none" : ""
        }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`${!isConnected ? "brightness-50" : ""
          } bg-[#111111] rounded-xl p-4 pb-8 text-white flex flex-col gap-4 md:p-6 md:pb-10 md:w-[50%] lg:w-[40%]`}
      >
        <h1 className="font-[100] text-lg">Burn $PTC</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="burnAmount" className="font-medium">
            Burn Amount
          </label>

          <input
            type="number"
            placeholder="0"
            id="burnAmount"
            required
            onChange={(e) => {
              setBurnAmount(parseFloat(e.target.value));
            }}
            className="bg-[#1A1A1A] rounded-lg px-2 py-2 outline-none border border-[#FFFFFF59] transition-all duration-200 ease-linear hover:border-[#FFFFFF] focus:border-[#FFFFFF]"
          />

          <p className="text-sm">
            Available Balance: {humanFriendlyBalance(userBalance, 8)} PTC
          </p>

          <button
            type="submit"
            className="w-full mt-2 bg-black rounded-lg py-2 pb-4 font-[200] transition-all duration-200 ease-linear hover:bg-[#000000b3]"
          >
            Burn
          </button>
        </div>
      </form>

      <div className="text-white flex flex-col items-start gap-10 px-4 md:px-2 md:w-[50%] lg:w-[60%]">
        <div
          className={`${!isConnected ? "brightness-50" : ""
            } flex flex-col gap-4 md:gap-5`}
        >
          <div className="flex justify-between items-center md:pt-4">
            <h1 className="font-[100] text-xl">Burning</h1>

            <button>
              {/* <HiX className="text-white text-xl" /> */}
            </button>
          </div>

          <div>
            <p>
              $PTC Token is bringing value and utility! Buy it, Win it, Sell it, Stake it, Burn it, and Spend it! Come join our amazing community today!
            </p>
          </div>
        </div>

        {!isConnected && (
          <button

            onClick={openConnectModal}


            className="pointer-events-auto w-auto bg-[#1A1B1F] rounded-lg px-6 py-2 font-medium transition-all duration-200 ease-linear hover:bg-[#1a1b1fd8]">
            Connect Wallet
          </button>
        )}
      </div>
    </section>
  );
}
