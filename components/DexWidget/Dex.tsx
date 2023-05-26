import React from "react";

import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import TradeTabs from "../Tabs/TradeTabs";
import { SegmentedToggle } from "./SegmentedToggle";


export default function Dex() {
    const { openConnectModal } = useConnectModal();
    const { address, isConnected } = useAccount();
    const [activeTradeMode, setActiveTradeMode] = React.useState("fiatonoff");


    function parseBalance(number: string, decimals: number) {
        //take integer or float and convert to wei but 8 decimal places
        const balance = ethers.utils.parseUnits(number, decimals);
        return balance;
    }

    const fiatOnOff =  "https://launch.rbx.ae/dexwidget?spending_token=0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE&spending_chain_id=56&bl=true&receiving_token=0xf382A28AAb0320e48D3D751f696f935B014B49BD&receiving_chain_id=56&ref_wallet=0x6d8f8CAC87CcE303fE7391549C7A357f0D98D09a"
    const multichain = "https://launch.rbx.ae/p2pwidget?spending_token=0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE&spending_chain_id=56&receiving_token=0xf382A28AAb0320e48D3D751f696f935B014B49BD&receiving_chain_id=56&ref_wallet=0x6d8f8CAC87CcE303fE7391549C7A357f0D98D09a"
    

    return (
        <section
            className={`rounded-xl flex flex-col gap-6 pb-8 md:pb-0 md:gap-8 mb-8 md:flex-row ${!isConnected ? "bg-black pointer-events-none" : ""
                }`}
        >
            <form

                className={`${!isConnected ? "brightness-50" : ""
                    } bg-[#111111] rounded-xl p-2 pb-8 text-white flex flex-col gap-4 md:p-6 md:pb-10 md:w-[50%] lg:w-[40%]`}
            >
                <h1 className="font-[100] text-lg p-2 ">TRADE</h1>
                <SegmentedToggle setActiveTradeMode={setActiveTradeMode}/>
                <div className="min-h-[554px] ">
                    <iframe className={`min-h-[554px] min-w-[100%] ${activeTradeMode == "fiatonoff" ? "hidden" : ""}`} src={fiatOnOff} id="_RBX_DEX_WIDGET" />
                    <iframe className={`min-h-[554px] min-w-[100%] ${activeTradeMode !== "fiatonoff" ? "hidden" : ""}`} src={multichain} id="_RBX_DEX_WIDGET" />
                </div>

            </form>

            <div className="text-white flex flex-col items-start gap-10 px-4 md:px-2 md:w-[50%] lg:w-[60%]">
                <div
                    className={`${!isConnected ? "brightness-50" : ""
                        } flex flex-col gap-4 md:gap-5`}
                >
                    <div className="flex justify-between items-center md:pt-4">
                        <h1 className="font-[100] text-xl">Trade</h1>


                    </div>

                    <div>
                        <p>
                            Trading Portal is a revolutionary utility allowing the ability to trade PTC and Bep20 XRP staking rewards to any other Cryptocurrency across BSC or 15 other popular blockchains with low fees and Onramp / Offramp for fiat without KYC!
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
