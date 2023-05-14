/* eslint-disable @next/next/no-img-element */

import BNB from "cryptocurrency-icons/32@2x/color/bnb@2x.png";
import USDC from "cryptocurrency-icons/32@2x/color/usdc@2x.png";
import USDT from "cryptocurrency-icons/32@2x/color/usdt@2x.png";
import BTC from "cryptocurrency-icons/32@2x/color/btc@2x.png";
import XRP from "cryptocurrency-icons/32@2x/color/xrp@2x.png";
import XLM from "cryptocurrency-icons/32@2x/color/xlm@2x.png";
import Option from "../../interfaces/Option";
import { useRecoilValue ,useRecoilState} from "recoil";
import selectedOptionState1 from "../../atoms/selectedOption1";
import selectedOptionState2 from "../../atoms/selectedOption2";
import { useState, useEffect, useRef } from "react";

const ICONS = {
  bnb: BNB,
  usdc: USDC,
  usdt: USDT,
  btc: BTC,
  xrp: XRP,
  xlm: XLM,
  ptc : USDC
};


const getImageFromSymbol = (symbol: string) => {

  return ICONS[symbol.toLowerCase() as keyof typeof ICONS];
  

};

interface DropdownProps {
  options: Option[];
  isFrom? : boolean;
  onSelect: (option: Option) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setMaxValue: (isFrom: boolean) => void;
}


const Dropdown = ({ options ,isFrom,setMaxValue, onSelect, onChange }: DropdownProps) => {

  // const selectedOption1 = useRecoilValue(selectedOptionState1);
  // const selectedOption2 = useRecoilValue(selectedOptionState2);

  const [selectedOption1, setSelectedOption1] = useRecoilState<Option>(selectedOptionState1)
  const [selectedOption2, setSelectedOption2] = useRecoilState<Option>(selectedOptionState2)

  const [selectedOption,setSelectedOption] = isFrom ? [selectedOption1,setSelectedOption1] : [selectedOption2,setSelectedOption2]




  // const selectedOption = isFrom ? selectedOption1 : selectedOption2;
  const [showOptions, setShowOptions] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleChange = (option : Option) => {
    setSelectedOption(option);
    setShowOptions(false);
    onSelect(option);
    setIsOptionSelected(true);
  };

  const stopPropagationOnClick = (event : any) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const handleOutsideClick = (event : any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownRef]);


  

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className="w-full flex items-center rounded-md border border-[#FFFFFF59] px-2 py-2 bg-[#1A1A1A] text-sm font-medium text-[#FFFFFF8C] hover:bg-[#1a1a1ac6] focus:outline-none sm:px-4"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded={showOptions}
            onClick={handleToggleOptions}
          >
            <img
              src={getImageFromSymbol(selectedOption.icon).src}
              alt={selectedOption.text}
              className="h-6 w-6 mr-2"
            />

            {/* {selectedOption.text} */}
            {isOptionSelected ? selectedOption.text : "Select a coin"}

            {isOptionSelected && (
              <>
                <input
                  type="number"
                  disabled={!isFrom}
                  id={`${isFrom ? "from" : "to"}-amount`}
                  onChange={onChange}
                  onClick={stopPropagationOnClick}
                  className="w-full ml-2 bg-[#1a1a1a86] rounded-md border border-[#FFFFFF59] outline-none px-2 py-1 text-sm font-medium text-[#FFFFFF8C]"
                />
                {isFrom && (
                   <button
                   type="button"
                   onClick={(event) =>{ 
 
                     stopPropagationOnClick(event)
                     setMaxValue(isFrom ? true : false)
                   
                   } }
                   className="ml-2 px-3 py-1 rounded-md bg-[#3c3c3c] text-white text-sm font-medium transition-all ease-linear hover:bg-[#3c3c3ce9]"
                   // onClick={stopPropagationOnClick}
                 >
                   Max
                 </button>
                 )}
               
              </>
            )}
          </button>
        </span>
      </div>

      {showOptions && (
        <div
          className="dropdown-options w-full absolute z-10 right-0 mt-2 rounded-md shadow-lg bg-[#1A1A1A] max-h-40 overflow-y-scroll"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="w-full">
            {options.map((option) => (
              <button
                key={option.text}
                onClick={() => handleChange(option)}
                className="w-full flex items-center rounded-md px-4 py-2 bg-[#1A1A1A] text-sm font-medium text-[#FFFFFF8C] hover:bg-[#242323] focus:outline-none"
                role="menuitem"
              >
                <img
                  src={getImageFromSymbol(option.icon).src}
                  alt={option.text}
                  className="h-6 w-6 mr-2"
                ></img>
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;