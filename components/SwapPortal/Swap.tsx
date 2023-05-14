import { useEffect, useState } from "react";
import { erc20ABI, useContractWrite, usePrepareContractWrite } from "wagmi";
import { readContract } from '@wagmi/core'
import { useContractRead } from "wagmi";
import { Address } from "wagmi";
import { BigNumber } from "ethers";
import { humanFriendlyBalance, config } from "../../config/contracts";
import { useAccount } from "wagmi";
import Dropdown from "./DropDown";
import { useRecoilState } from "recoil";
import selectedOptionState1 from "../../atoms/selectedOption1";
import selectedOptionState2 from "../../atoms/selectedOption2";
import { ArrowSwapVertical } from "iconsax-react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Option from "../../interfaces/Option";
import optionsForDropdown from "../../interfaces/Options";
import { useBalance } from "wagmi";
import pancakeABI from "../../abis/pancake.json"
import { parseWei } from "web3-units";
import { ChainId, Token,  Pair, Trade, TradeType, Route,CurrencyAmount } from "@pancakeswap/sdk"


const Swap = () => {
  const { openConnectModal } = useConnectModal();
  
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address as Address,
  });

  const optionsForDropdown1 = optionsForDropdown;

  const optionsForDropdown2 = optionsForDropdown;

  const [selectedValue1, setSelectedValue1] =
    useRecoilState<Option>(selectedOptionState1);
  const [selectedValue2, setSelectedValue2] =
    useRecoilState<Option>(selectedOptionState2);

  const handleSelect1 = (option: Option) => {
    setSelectedValue1(option as Option);
  };

  const handleSelect2 = (option: Option) => {
    setSelectedValue2(option as Option);
  };

  let [inputValue1, setInputValue1] = useState(0);
  let [inputValue2, setInputValue2] = useState(0);

  const handleInputChange1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputValue1(parseFloat(event.target.value));
  };
  const handleInputChange2 = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputValue2(parseFloat(event.target.value));
  };

  const { data: balance1 } = useContractRead({
    abi: erc20ABI,
    address: selectedValue1.address as Address,
    functionName: "balanceOf",
    args: [address as Address],
  });

  const { data: balance2 } = useContractRead({
    abi: erc20ABI,
    address: selectedValue2.address as Address,
    functionName: "balanceOf",
    args: [address as Address],
  });

  const setMaxValue = (isFrom: boolean) => {
    let id: string;
    if (isFrom) {
      id = "from-amount";
    } else {
      id = "to-amount";
    }
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      const val  = isFrom
        ? humanFriendlyBalance(
            selectedValue1.value == "wbnb"
              ? balance
                ? balance.value.toString()
                : "0"
              : balance1
              ? balance1.toString()
              : "0",

            selectedValue1.decimals
          )
        : humanFriendlyBalance(
            selectedValue2.value == "wbnb"
              ? balance
                ? balance.value.toString()
                : "0"
              : balance2
              ? balance2.toString()
              : "0",
            // balance2 ? balance2.toString() : "0",
            selectedValue2.decimals
          );

      input.value = val;
      if (isFrom) {
        setInputValue1(parseFloat(val));
      }
      else {
        setInputValue2(parseFloat(val));
      }

    }
  };

  const reverseToandFrom = () => {
    const temp = selectedValue1;
    setSelectedValue1(selectedValue2 as Option);
    setSelectedValue2(temp);
    const temp2 = inputValue1;
    setInputValue1(inputValue2);
    setInputValue2(temp2);
  };

  

  


  
  const { data: amountOut } = useContractRead({
    abi: pancakeABI,
    address: config.router as Address,
    functionName: "getAmountsOut",
    args: [parseWei(inputValue1 ? inputValue1 : 0,selectedValue1.decimals).toString(), [selectedValue1.address, selectedValue2.address]],
  });

  const { data: isAppproved } = useContractRead({
    abi: erc20ABI,
    address: selectedValue1.address as Address,
    functionName: "allowance",
    args: [address as Address, config.router as Address]
  });

  const needsApproval = () => {
    if (isAppproved) {

      return BigNumber.from(isAppproved).lt(BigNumber.from(parseWei(inputValue1 ? inputValue1 : 0,selectedValue1.decimals).toString()))
    }
    return true;
  }

  const MAX_INT = "115792089237316195423570985008687907853269984665640564039457584007913129639935";

  const {config:prepareApprove } = usePrepareContractWrite({
    abi: erc20ABI,
    address: selectedValue1.address as Address,
    functionName: "approve",
    args: [config.router as Address, BigNumber.from(MAX_INT)],
  });



  const {write:approve} = useContractWrite(prepareApprove);


  const {config:prepareSwap } = usePrepareContractWrite({
    abi: pancakeABI,
    address: config.router as Address,
    functionName: "swapExactTokensForETH",
    args: [parseWei(inputValue1 ? inputValue1 : 0,selectedValue1.decimals).toString(), 0, [selectedValue1.address, selectedValue2.address], address as Address, Date.now() + 1000 * 60 * 10],
  });

  const {write:swap} = useContractWrite(prepareSwap);







  return (
    <section
      className={`rounded-xl flex flex-col gap-6 pb-8 md:pb-0 md:gap-8 mb-16 md:flex-row ${
        !isConnected ? "bg-black pointer-events-none" : ""
      }`}
    >
      <div
        className={`${
          !isConnected ? "brightness-50" : ""
        } bg-[#111111] rounded-xl p-4 pb-8 text-white flex flex-col gap-4 md:p-6 md:pb-10 md:w-[50%] lg:w-[40%]`}
      >
        <h1 className="font-[100] text-lg">SWAP $PTC</h1>

        <div className="flex flex-col gap-2">
          <label>From</label>

          <Dropdown
            options={optionsForDropdown1}
            isFrom={true}
            onSelect={handleSelect1}
            onChange={handleInputChange1}
            setMaxValue={setMaxValue}
          />
          <span className="text-[#7D7D7D] text-sm">
            Balance:{" "}
            {selectedValue1.value == "wbnb"
              ? humanFriendlyBalance(
                  parseInt(balance?.value.toString() || "0"),
                  selectedValue1.decimals
                )
              : humanFriendlyBalance(
                  parseInt(balance1?.toString() || "0"),
                  selectedValue1.decimals
                )}
            {" " + selectedValue1.value.toUpperCase()}
          </span>
        </div>

        <button className="flex justify-center" onClick={reverseToandFrom}>
          <ArrowSwapVertical size="25" color="#FF8A65" />
        </button>

        <div className="flex flex-col gap-2">
          <label>To</label>

          <Dropdown
            options={optionsForDropdown2}
            isFrom={false}
            onSelect={handleSelect2}
            onChange={handleInputChange2}
            setMaxValue={setMaxValue}
          />
          <span className="text-[#7D7D7D] text-sm">
            Balance:{" "}
            {selectedValue2.value == "wbnb"
              ? humanFriendlyBalance(
                  parseInt(balance?.value.toString() || "0"),
                  18
                )
              : humanFriendlyBalance(
                  parseInt(balance2?.toString() || "0"),
                  selectedValue2.decimals
                )}
            {" " + selectedValue2.value.toUpperCase()}
          </span>
        </div>

        {needsApproval() && (
          <button 
          onClick={approve}
          className="w-full mt-4 bg-black rounded-lg py-2 font-[200] transition-all duration-200 ease-linear hover:bg-[#000000b3]">
            Approve
          </button>
        )}

        <button 
        
        onClick={swap}
        
        className="w-full mt-4 bg-black rounded-lg py-2 font-[200] transition-all duration-200 ease-linear hover:bg-[#000000b3]">
          SWAP
        </button>
      </div>

      <div className="text-white flex flex-col items-start gap-10 px-4 md:px-2 md:w-[50%] lg:w-[60%]">
        <div
          className={`${
            !isConnected ? "brightness-50" : ""
          } w-full flex flex-col gap-4 md:gap-5`}
        >
          <div className="flex justify-between items-center md:pt-4">
            <h1 className="font-[100] text-xl">SWAP</h1>

            <button>{/* <HiX className="text-white text-xl" /> */}</button>
          </div>

          <div>
            <p>Swap $PTC with Other Available Coins</p>
          </div>
        </div>

        {!isConnected && (
          <button
            onClick={openConnectModal}
            className="pointer-events-auto w-auto bg-[#1A1B1F] rounded-lg px-6 py-2 font-medium transition-all duration-200 ease-linear hover:bg-[#1a1b1fd8]"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </section>
  );
};

export default Swap;
