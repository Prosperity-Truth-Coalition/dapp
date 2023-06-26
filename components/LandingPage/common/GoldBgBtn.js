import React from "react";

const GoldBgBtn = (props) => {
  return (
    <button className="w-full bg-gold text-sm font-[600] text-black px-6 pt-1 pb-2.5 rounded-md xs:w-fit xl:text-base lg:px-8">
      {props.btnLabel}
    </button>
  );
};

export default GoldBgBtn;
